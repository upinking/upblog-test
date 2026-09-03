---
title: "React 并发渲染：不是更快，而是更会安排"
description: "从调度、Transition 与延迟值出发，建立 React 并发渲染的正确心智模型。"
publishedAt: 2026-08-28
updatedAt: 2026-09-03
category: "React"
tags: ["React", "并发渲染", "性能"]
cover: "/assets/software-architecture.webp"
featured: false
draft: false
---

很多人第一次听到“并发渲染”，会自然地把它理解成：React 同时开了几个线程，因此页面会更快。这个说法既直观，又不准确。React 的并发能力首先是一套**可中断、可恢复、有优先级的渲染机制**。它不保证每一项计算更快，而是尽量避免一项不紧急的大更新长期占住主线程。

理解这件事，要先把一次界面更新拆成两段：render 阶段计算下一棵 UI 树，commit 阶段把结果真正写入 DOM。并发渲染主要改变前一段。React 可以暂停尚未提交的 render，先响应输入等更紧急的工作，再回来继续。commit 仍然是同步且不可中断的，因为用户不能看到“提交了一半”的界面。

## 优先级来自用户意图

想象一个带有大结果集的搜索页。用户输入一个字符时，输入框必须立即显示；根据关键字重新筛选几千条记录，则可以稍后完成。两次更新由同一次事件触发，却有不同的紧迫程度。

```jsx
import { startTransition, useState } from 'react'

function SearchPanel() {
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')

  function handleChange(event) {
    const next = event.target.value
    setInput(next)
    startTransition(() => setQuery(next))
  }

  return (
    <>
      <input value={input} onChange={handleChange} />
      <ExpensiveResults query={query} />
    </>
  )
}
```

`setInput` 是紧急更新，`setQuery` 被标记为 Transition。新的输入到来时，React 可以放弃尚未完成的旧结果渲染，转而处理最新状态。关键点不是“把慢代码放进后台线程”，而是允许 React 调整工作顺序。

## startTransition 与 useTransition

`startTransition` 适合不需要展示等待状态的调用点。`useTransition` 还会返回 `isPending`，可以让界面表达“旧内容仍可用，但新内容正在准备”。

```jsx
const [isPending, startTransition] = useTransition()

function selectTab(nextTab) {
  startTransition(() => setTab(nextTab))
}

return <section aria-busy={isPending}>{content}</section>
```

不要在 pending 时立刻用全屏骨架替换旧内容。保留仍然可读的旧界面，再用透明度、局部进度或状态文案提示变化，通常比“闪一下空白”更自然。

Transition 也不适合控制文本输入，因为输入框的受控值必须同步跟随键盘。它适合标签页切换、路由导航、复杂图表更新、非即时筛选等允许短暂延后的工作。

## 延迟一个值，而不是一次更新

当你无法控制产生状态的代码，或者一个值被多个组件消费，可以使用 `useDeferredValue`：

```jsx
const deferredQuery = useDeferredValue(query)
const isStale = query !== deferredQuery

return (
  <div style={{ opacity: isStale ? 0.55 : 1 }}>
    <SearchResults query={deferredQuery} />
  </div>
)
```

它让子树暂时继续使用旧值，并在后台尝试新值。传入值最好是字符串、数字等稳定值；如果每次 render 都创建一个新对象，会触发没有意义的后台渲染。

## Suspense 是边界，不是加载器

Suspense 负责声明“这部分尚未准备好时显示什么”。它本身不请求数据。框架、支持 Suspense 的数据源或 `lazy` 组件在读取未完成资源时挂起，React 再选择最近的边界。

边界的位置决定体验。整页一个 Suspense 往往会让小更新清空大面积内容；把边界放在能够独立理解的区域附近，旧导航与页面结构便可继续工作。

```jsx
<PageLayout>
  <Suspense fallback={<ArticleSkeleton />}>
    <Article id={articleId} />
  </Suspense>
</PageLayout>
```

## 并发能力无法修复昂贵代码

如果一次 commit 会插入一万个 DOM 节点，或者 render 内运行 O(n²) 算法，并发调度只能改善响应顺序，不能消除成本。真正的优化顺序通常是：

1. 用 Profiler 找到实际瓶颈，而不是先加 `memo`。
2. 缩小状态影响范围，避免整页随一个输入重算。
3. 对长列表做虚拟化或分页。
4. 缓存确实昂贵且输入稳定的计算。
5. 最后再用 Transition 改善不可避免的大更新体验。

## 一份可执行的判断表

当更新必须跟随键盘、指针或焦点时，把它视为紧急更新；当用户可以继续阅读旧结果时，考虑 Transition；当组件只拿到一个变化过快的值时，考虑 `useDeferredValue`；当内容可能异步准备时，设计 Suspense 边界；当主线程仍然长时间卡住时，回到算法、DOM 数量和数据结构本身。

并发渲染最有价值的地方，是让我们显式表达交互意图。性能不再只是“少渲染几次”，而是让重要的反馈永远排在用户等待之前。

## 延伸阅读

- [React：startTransition](https://react.dev/reference/react/startTransition)
- [React：useDeferredValue](https://react.dev/reference/react/useDeferredValue)
- [React：Suspense](https://react.dev/reference/react/Suspense)

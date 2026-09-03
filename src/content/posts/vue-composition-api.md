---
title: "Vue 3 Composition API：按问题组织逻辑"
description: "理解响应式、composable 与副作用清理，避免把 Options API 的分区机械搬进 setup。"
publishedAt: 2026-07-17
updatedAt: 2026-09-03
category: "Vue"
tags: ["Vue 3", "Composition API", "组件设计"]
cover: "/assets/project-blueprint.webp"
featured: false
draft: false
---

Composition API 的价值不是把 `data`、`methods` 和 `computed` 换成函数，而是让同一个业务问题的状态、派生值与副作用靠在一起。当组件变大时，代码不再按选项类型分散，复用也不必依赖 mixin 的隐式合并。

## ref、reactive 与解构

`ref` 可以包装任意值，通过 `.value` 在 JavaScript 中访问；模板会自动解包。`reactive` 更适合保持一个对象的代理身份，但直接解构会失去属性与代理之间的连接。

```ts
const state = reactive({ count: 0 })
const { count } = state // 普通数字，不再响应
const { count: reactiveCount } = toRefs(state)
```

团队应优先保持简单：独立状态使用 `ref`，明确作为整体维护的对象再使用 `reactive`。不要只为了少写 `.value` 牺牲数据流的可读性。

## computed 描述派生，watch 处理副作用

可以由现有状态计算出的值，不要再存一份：

```ts
const items = ref<CartItem[]>([])
const total = computed(() =>
  items.value.reduce((sum, item) => sum + item.price * item.count, 0)
)
```

`watch` 适合请求、存储、日志等副作用。异步 watch 要清理旧任务，避免慢请求覆盖新结果：

```ts
watch(query, async (value, _, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())
  results.value = await search(value, controller.signal)
})
```

## composable 是能力边界

一个好的 composable 有清晰输入、稳定返回值和完整清理逻辑。它可以管理窗口事件、远端请求或表单状态，但不应偷偷修改无关全局状态。

```ts
export function useOnlineStatus() {
  const online = ref(navigator.onLine)
  const update = () => { online.value = navigator.onLine }

  onMounted(() => {
    addEventListener('online', update)
    addEventListener('offline', update)
  })
  onUnmounted(() => {
    removeEventListener('online', update)
    removeEventListener('offline', update)
  })
  return readonly(online)
}
```

## 不必为组合而组合

几十行且职责单一的组件，留在一个 `setup` 中完全合理。过早拆分会迫使读者在文件间跳转。提炼 composable 的信号通常是：逻辑能用业务名称描述、拥有自己的生命周期，或者已在多个组件中重复。

Composition API 最终改变的是组织代码的轴：从“这是方法还是计算属性”，转向“它们共同解决什么问题”。

## 延伸阅读

- [Vue：Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue：Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

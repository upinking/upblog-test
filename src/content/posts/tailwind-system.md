---
title: "Tailwind CSS 实践：从工具类到设计约束"
description: "用 token、组件边界和响应式策略，让工具类成为稳定系统而不是越来越长的字符串。"
publishedAt: 2026-07-24
updatedAt: 2026-09-03
category: "CSS"
tags: ["Tailwind CSS", "设计系统", "响应式"]
cover: "/assets/project-blueprint.webp"
featured: false
draft: false
---

Tailwind 最容易被误解为“把 CSS 全写进 class”。它真正提供的是一套受约束的选择空间：固定的间距、字号、颜色和断点，让团队更少发明一次性数值。

## 从 token 开始

不要让每个页面各自选择相近但不同的蓝色。先定义语义：背景、正文、弱文本、强调、危险状态。组件消费语义，品牌调整才不需要全局搜索替换。

工具类很适合描述局部布局，但重复出现的交互模式应该提炼为组件。判断标准不是 class 有多长，而是这段结构是否拥有名称、状态与复用价值。一个只出现一次的 hero 不必抽成十个包装组件；一个在全站出现的按钮则应统一 focus、disabled 与 loading 状态。

## 移动优先不是缩小桌面

无前缀样式作用于所有尺寸，断点前缀向更宽屏覆盖。先写最小屏的内容顺序，再逐步增加列数和留白：

```html
<section class="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
  <article>...</article>
  <aside>...</aside>
</section>
```

不要把 `sm:` 理解成“手机专用”。它表示从该最小宽度开始生效。组件内部越来越适合使用 container query，因为同一组件可能出现在主栏或窄侧栏，视口宽度不能代表它真正拥有的空间。

## 管理复杂状态

hover 只是状态之一。按钮还需要 `focus-visible`、`disabled`、键盘操作和触摸反馈。使用 `group` 或 `peer` 时，确保视觉依赖仍与真实语义元素关联，不要为了写选择器而改变正确的 DOM。

## 避免三种失控

第一种是任意值泛滥：`mt-[13px]` 到处出现，最终又回到没有系统的 CSS。第二种是把长 class 机械搬进 `@apply`，失去就地阅读优势。第三种是为了复用而创建过度通用的组件，暴露几十个布尔参数。

好的约束允许少量例外，但要求例外有理由。先使用设计尺度；确认一个数值确实承担独特视觉角色时，再引入新 token。

## 一份团队约定

- 页面负责组合，组件负责状态。
- 颜色使用语义 token，不直接传播品牌色值。
- 响应式从内容优先级出发，而非设备名称。
- 任意值需要评审；重复两次先观察，重复三次再提炼。
- 每个交互组件都检查键盘、焦点、禁用和加载状态。

Tailwind 不会自动产生一致性。它只是让一致的选择更近，让不一致的选择更容易被看见。

## 延伸阅读

- [Tailwind CSS：Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Tailwind CSS：Responsive design](https://tailwindcss.com/docs/responsive-design)

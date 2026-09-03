---
title: "现代 CSS 动画：为状态变化建立节奏"
description: "从 transform、缓动、编排和 reduced motion 出发，让动画服务于理解而不是装饰。"
publishedAt: 2026-07-31
updatedAt: 2026-09-03
category: "CSS"
tags: ["CSS", "动效", "可访问性"]
cover: "/assets/software-architecture.webp"
featured: false
draft: false
---

好的界面动画会回答三个问题：什么发生了变化、变化从哪里开始、用户下一步可以做什么。它不是给静态页面套一层晃动，而是在两个状态之间补上因果关系。

## 先选择正确的属性

优先动画 `transform` 与 `opacity`。它们通常不要求浏览器重新计算布局，稳定性远好于不断改变 `width`、`height`、`top` 或大范围阴影。

```css
.card {
  transform: translateY(0);
  transition: transform 220ms cubic-bezier(.2, .8, .2, 1);
}

.card:hover { transform: translateY(-4px); }
```

`will-change` 不是性能咒语。长期给大量元素添加它，会占用额外合成资源。只在确实需要且动画即将发生时使用。

## 时间表达层级

微交互通常在 120–240ms 内完成；面板和页面区域可以使用 240–420ms；大幅度叙事转场再考虑更长时间。离用户输入越近，反馈越应该迅速。

缓动比时长更能决定质感。进入动画适合快速建立动量后慢慢停下，退出动画应更果断。自然界中的运动很少匀速开始、匀速停止，因此 `linear` 更适合持续旋转、进度流动等没有明确起止的过程。

## 编排而不是同时播放

标题、说明、按钮一起淡入，只是“出现”。让标题先建立位置，说明随后补充语义，操作最后成为落点，才形成阅读顺序。相邻元素的错峰通常保持在 30–80ms，过大就会让用户等动画。

## 尊重减少动态效果

大幅缩放、视差和持续位移可能造成不适。为系统偏好提供静态结果：

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
}
```

减少动态不代表删除所有反馈。颜色、边框与即时状态变化仍可帮助理解，只需避免非必要空间运动。

## 用检查代替感觉

在低端移动设备上测试；观察动画期间是否仍能滚动和输入；确认焦点状态不依赖 hover；检查内容在动画失败或 JavaScript 禁用时是否仍然可见。最后问一句：删掉这个动画，用户是否更难理解变化？如果答案是否定的，它也许只需要更克制。

## 延伸阅读

- [MDN：CSS 动画性能](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate)
- [MDN：prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

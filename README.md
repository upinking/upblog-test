# UPINKING Blog

UPINKING 的静态技术博客，基于 Astro Content Collections 构建。React 只用于首页景深动效、项目数据增强和实验室工具。

## 本地运行

```bash
npm install
npm run dev
```

生产检查：

```bash
npm run check
npm test
npm run build
```

站点地址默认是 `http://localhost:4321`。生成 sitemap、RSS 或部署前，可复制 `.env.example` 为 `.env` 并设置 `PUBLIC_SITE_URL`。

## 新增文章

在 `src/content/posts` 新建 Markdown 文件，文件名就是稳定 slug，例如 `browser-rendering.md` 会生成 `/articles/browser-rendering/`。

```yaml
---
title: 浏览器渲染管线
description: 一句话摘要，用于列表、搜索与 SEO。
publishedAt: 2026-09-03
updatedAt: 2026-09-03
category: 前端工程
tags: [Browser, Performance]
cover: /assets/software-architecture.webp
featured: false
draft: false
---
```

字段缺失或日期无效会让构建失败。正文支持 GFM 表格、任务列表、代码块与 KaTeX 数学公式；阅读时间会按中英文内容自动估算。

## 封面资源

文章封面放在 `public/assets`，优先使用 WebP 或 AVIF。推荐至少 1600×900，保持无文字，以便页面用真实 HTML 渲染标题。首页视觉源文件位于 `src/assets`，由 Astro 自动生成响应式图片。

## 数据与兼容

- 项目页优先读取 upinking 的 GitHub 公开数据，失败时使用 `src/data/projects.ts` 的快照。
- 实验室数据保存在版本化 localStorage 键 `upinking:lab:v1:*` 下。
- `/blog`、旧数字文章 URL 和 `/tools` 会永久跳转到新地址。

import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// 默认文章数据
const defaultPostsData = {
  1: {
    title: '探索 React 18 的并发特性',
    date: '2026-04-20',
    category: 'React',
    readTime: '8 分钟',
    gradient: 'from-blue-400 to-cyan-400',
    emoji: '⚛️',
    content: `
React 18 引入了令人兴奋的并发特性,这些特性将彻底改变我们构建 React 应用的方式。

## 什么是并发渲染?

并发渲染是 React 18 的核心特性。它允许 React 同时准备多个版本的 UI,这意味着 React 可以在后台准备 UI 更新,而不会阻塞主线程。

## 主要特性

### 1. 自动批处理
React 18 会自动批处理所有更新,无论它们发生在哪里。这包括:
- Promise 回调
- setTimeout
- 原生事件处理程序

### 2. startTransition
使用 startTransition,你可以将某些更新标记为非紧急更新:

\`\`\`javascript
import { startTransition } from 'react';

// 紧急更新
setInputValue(input);

// 非紧急更新
startTransition(() => {
  setSearchQuery(input);
});
\`\`\`

### 3. Suspense 改进
Suspense 现在可以与并发渲染配合使用,提供更好的加载状态管理。

## 实际应用场景

并发特性在以下场景中特别有用:
- 大型列表渲染
- 复杂表单处理
- 数据搜索和过滤
- 路由切换

## 总结

React 18 的并发特性为我们提供了更强大的工具来优化应用性能。通过合理使用这些特性,我们可以创建更流畅、更响应式的用户界面。
    `,
  },
  2: {
    title: '现代 CSS 动画技巧',
    date: '2026-04-18',
    category: 'CSS',
    readTime: '6 分钟',
    gradient: 'from-purple-400 to-pink-400',
    emoji: '🎨',
    content: `
CSS 动画是前端开发中不可或缺的一部分。让我们一起探索现代 CSS 动画的最佳实践。

## CSS Transition vs Animation

### Transition (过渡)
适用于简单的状态变化:

\`\`\`css
.button {
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
}
\`\`\`

### Animation (动画)
适用于更复杂的动画序列:

\`\`\`css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
\`\`\`

## 实用技巧

### 1. 使用 transform 和 opacity
这两个属性可以在合成线程上处理,性能最佳。

### 2. 避免布局抖动
使用 will-change 提示浏览器优化动画性能。

### 3. 缓动函数
选择合适的缓动函数让动画更自然:
- ease-in-out: 平滑开始和结束
- cubic-bezier: 自定义缓动曲线

## 结合 Framer Motion

Framer Motion 提供了更强大的动画能力:
- 弹簧物理动画
- 手势交互
- 布局动画
- 页面过渡

## 最佳实践

1. 保持动画简洁
2. 尊重用户的动画偏好
3. 注意性能影响
4. 使用 GPU 加速的属性
    `,
  },
  3: {
    title: 'TypeScript 高级类型编程',
    date: '2026-04-15',
    category: 'TypeScript',
    readTime: '10 分钟',
    gradient: 'from-orange-400 to-red-400',
    emoji: '📘',
    content: `
TypeScript 的类型系统非常强大,掌握高级类型技巧可以让代码更加安全和可维护。

## 泛型基础

泛型允许我们创建可重用的类型安全组件:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## 条件类型

条件类型允许我们根据类型参数来决定最终类型:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
\`\`\`

## 映射类型

映射类型可以基于已有类型创建新类型:

\`\`\`typescript
type Optional<T> = {
  [P in keyof T]?: T[P];
};
\`\`\`

## 实用工具类型

TypeScript 内置了很多实用的工具类型:
- Partial<T>: 将所有属性变为可选
- Required<T>: 将所有属性变为必需
- Readonly<T>: 将所有属性变为只读
- Pick<T, K>: 选择特定属性
- Omit<T, K>: 排除特定属性

## 高级模式

### 1. 类型推断
使用 infer 关键字进行类型推断。

### 2. 模板字面量类型
基于字符串字面量创建类型。

### 3. 递归类型
处理嵌套数据结构。

## 总结

掌握这些高级类型技巧,可以大幅提升代码的类型安全性和开发体验。
    `,
  },
  7: {
    title: '麦克斯韦方程的重要性',
    date: '2026-04-25',
    category: '物理',
    readTime: '10 分钟',
    gradient: 'from-amber-400 to-yellow-400',
    emoji: '⚡',
    content: `
麦克斯韦方程组是经典电磁学的核心，被誉为物理学中最优美的方程组之一。它不仅统一了电学和磁学，更预言了电磁波的存在，深刻改变了人类文明的进程。

## 四个方程，一个世界

麦克斯韦方程组由四个方程组成，每一个都描述了电磁场的一个基本性质。

### 1. 高斯电场定律

高斯电场定律描述了电荷如何产生电场：

电场通过任意闭合曲面的通量，等于该曲面所包围的总电荷量除以真空介电常数。这告诉我们，电荷是电场的源，电场线从正电荷出发，终止于负电荷。

### 2. 高斯磁场定律

高斯磁场定律指出：

通过任意闭合曲面的磁通量恒为零。这意味着自然界中不存在磁单极子，磁感线永远是闭合的——没有起点，也没有终点。

### 3. 法拉第电磁感应定律

法拉第定律揭示了变化的磁场会产生电场：

闭合回路中的感应电动势等于穿过该回路的磁通量的负变化率。正是这个定律，让发电机成为可能，将机械能转化为电能，点亮了整个世界。

### 4. 安培-麦克斯韦定律

安培-麦克斯韦定律描述了电流和变化的电场如何产生磁场：

磁场沿闭合回路的线积分，等于穿过该回路的电流加上电通量变化率乘以真空介电常数。其中"变化的电场产生磁场"这一项，正是麦克斯韦本人的伟大贡献——位移电流。

## 麦克斯韦的伟大预见

麦克斯韦最惊人的成就是从这四个方程中推导出了电磁波的波动方程，并计算出电磁波的传播速度等于光速。由此他大胆预言：

光本身就是一种电磁波。

这一预言后来被赫兹的实验所证实，开启了无线通信的时代。

## 对现代科技的影响

麦克斯韦方程组的影响无处不在：

### 1. 无线通信
从收音机到手机，从 Wi-Fi 到卫星通信，所有无线通信技术都建立在电磁波理论之上。

### 2. 电力系统
发电机、变压器、电动机的工作原理都源于法拉第定律和安培定律。

### 3. 光学技术
光纤通信、激光、显示器等光学技术都基于电磁波理论。

### 4. 相对论的基石
爱因斯坦的狭义相对论正是从麦克斯韦方程的协变性出发，发现了时空的统一性。

## 数学之美

麦克斯韦方程组的数学形式极其优美。在微分形式下，四个方程可以简洁地写为：

∇·E = ρ/ε₀

∇·B = 0

∇×E = -∂B/∂t

∇×B = μ₀J + μ₀ε₀∂E/∂t

这种简洁与深刻，正是物理学的魅力所在——用最少的方程，描述最广泛的现象。

## 结语

麦克斯韦方程组不仅是一组物理定律，更是人类智慧的结晶。它将看似无关的电现象和磁现象统一为一个整体，预言了电磁波的存在，为现代文明奠定了基础。理解麦克斯韦方程，就是理解我们所生活的电磁世界的本质。
    `,
  },
}

function BlogPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [postsData, setPostsData] = useState(defaultPostsData)

  // 合并默认文章和用户写的文章
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
    if (savedPosts.length > 0) {
      const customPostsData = {}
      savedPosts.forEach(post => {
        customPostsData[post.id] = post
      })
      setPostsData({ ...defaultPostsData, ...customPostsData })
    }
  }, [])

  const post = postsData[id]

  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20 md:pt-28 pb-16 md:pb-20 px-3 md:px-4 min-h-screen flex items-center justify-center"
      >
        <div className="glass-card rounded-2xl md:rounded-[32px] p-6 md:p-12 text-center max-w-md">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl md:text-6xl mb-3 md:mb-4"
          >
            😕
          </motion.div>
          <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">文章不存在</h1>
          <button
            onClick={() => navigate('/blog')}
            className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-xl md:rounded-2xl text-sm md:text-base"
          >
            返回博客列表
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 md:pt-28 pb-16 md:pb-20 px-3 md:px-4 min-h-screen"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate('/blog')}
          className="flex items-center gap-1.5 md:gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6 px-3 md:px-4 py-2 glass-card rounded-xl md:rounded-2xl text-sm md:text-base"
        >
          ← 返回博客列表
        </motion.button>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl md:rounded-[32px] overflow-hidden mb-4 md:mb-6"
        >
          {/* Header gradient */}
          <div className={`h-32 md:h-40 bg-gradient-to-r ${post.gradient} flex items-center justify-center`}>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl md:text-7xl"
            >
              {post.emoji}
            </motion.span>
          </div>

          <div className="p-4 md:p-8">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
              <span className={`px-3 md:px-4 py-1 md:py-1.5 bg-gradient-to-r ${post.gradient} text-white rounded-full text-xs md:text-sm font-medium`}>
                {post.category}
              </span>
              <span className="text-gray-500 text-xs md:text-sm">{post.date}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-xs md:text-sm">{post.readTime}</span>
            </div>

            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {post.title}
            </h1>
          </div>
        </motion.div>

        {/* Content Card */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-6 lg:p-10 mb-4 md:mb-6"
        >
          <div className="prose prose-sm md:prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <motion.h2
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-2xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-gray-800"
                  >
                    {paragraph.replace('## ', '')}
                  </motion.h2>
                )
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <motion.h3
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-base md:text-xl font-semibold mt-4 md:mt-6 mb-2 md:mb-3 text-gray-700"
                  >
                    {paragraph.replace('### ', '')}
                  </motion.h3>
                )
              }
              if (paragraph.startsWith('```')) {
                return null
              }
              if (paragraph.trim()) {
                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4"
                  >
                    {paragraph}
                  </motion.p>
                )
              }
              return null
            })}
          </div>
        </motion.article>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 md:gap-4"
        >
          <button
            onClick={() => navigate('/blog')}
            className="flex-1 py-3 md:py-4 glass-card rounded-xl md:rounded-2xl text-gray-700 hover:bg-white/80 transition-all text-center text-sm md:text-base"
          >
            ← 上一篇
          </button>
          <button
            onClick={() => navigate('/blog')}
            className="flex-1 py-3 md:py-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-xl md:rounded-2xl hover:shadow-lg transition-all text-center text-sm md:text-base"
          >
            下一篇 →
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default BlogPost

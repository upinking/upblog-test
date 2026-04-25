import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// 默认文章列表
export const defaultPosts = [
  {
    id: 1,
    title: '探索 React 18 的并发特性',
    excerpt: '深入了解 React 18 带来的并发渲染、Suspense 改进和自动批处理等新特性',
    date: '2026-04-20',
    category: 'React',
    tags: ['React', '并发', '性能'],
    gradient: 'from-blue-400 to-cyan-400',
    emoji: '',
  },
  {
    id: 2,
    title: '现代 CSS 动画技巧',
    excerpt: '学习如何使用 CSS 和 Framer Motion 创建流畅的动画效果',
    date: '2026-04-18',
    category: 'CSS',
    tags: ['CSS', '动画', 'Framer Motion'],
    gradient: 'from-purple-400 to-pink-400',
    emoji: '',
  },
  {
    id: 3,
    title: 'TypeScript 高级类型编程',
    excerpt: '掌握泛型、条件类型和映射类型等高级 TypeScript 技巧',
    date: '2026-04-15',
    category: 'TypeScript',
    tags: ['TypeScript', '类型系统'],
    gradient: 'from-orange-400 to-red-400',
    emoji: '',
  },
  {
    id: 4,
    title: 'Node.js 性能优化实践',
    excerpt: '分享 Node.js 应用性能优化的最佳实践',
    date: '2026-04-12',
    category: 'Node.js',
    tags: ['Node.js', '性能优化'],
    gradient: 'from-green-400 to-emerald-400',
    emoji: '',
  },
  {
    id: 5,
    title: 'Tailwind CSS 实战教程',
    excerpt: '通过实际项目学习 Tailwind CSS 的核心概念',
    date: '2026-04-10',
    category: 'CSS',
    tags: ['Tailwind', 'CSS', '教程'],
    gradient: 'from-teal-400 to-cyan-400',
    emoji: '',
  },
  {
    id: 6,
    title: 'Vue 3 组合式 API 深度解析',
    excerpt: '深入理解 Vue 3 组合式 API 的设计理念和使用方法',
    date: '2026-04-08',
    category: 'Vue',
    tags: ['Vue', '组合式 API'],
    gradient: 'from-emerald-400 to-green-400',
    emoji: '',
  },
  {
    id: 7,
    title: '麦克斯韦方程的重要性',
    excerpt: '从电磁学的基石到现代科技的根基，解读麦克斯韦方程组如何塑造了我们的世界',
    date: '2026-04-25',
    category: '物理',
    tags: ['电磁学', '麦克斯韦方程', '物理学'],
    gradient: 'from-amber-400 to-yellow-400',
    emoji: '⚡',
  },
]

function Blog() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('全部')
  const [allPosts, setAllPosts] = useState(defaultPosts)

  // 从 localStorage 加载用户写的文章
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
    if (savedPosts.length > 0) {
      setAllPosts([...defaultPosts, ...savedPosts])
    }
  }, [])

  // 获取所有分类
  const defaultCategories = ['React', 'CSS', 'TypeScript', 'Node.js', 'Vue']
  const customCategories = [...new Set(allPosts.map(p => p.category))].filter(c => !defaultCategories.includes(c))
  const categories = ['全部', ...defaultCategories, ...customCategories]

  const filteredPosts = (activeCategory === '全部'
    ? allPosts
    : allPosts.filter(post => post.category === activeCategory)
  ).sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 md:pt-28 pb-16 md:pb-20 px-3 md:px-8 min-h-screen"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-8 mb-4 md:mb-6"
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-1 md:mb-2">
            <span className="text-gradient">博客文章</span>
          </h1>
          <p className="text-gray-600 text-center text-xs md:text-base">探索技术的深度与广度</p>
        </motion.div>

        {/* 写文章按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-4 md:mb-6 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/blog/write')}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-xl md:rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm md:text-base"
          >
            ✍️ 写文章
          </motion.button>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl md:rounded-[32px] p-3 md:p-4 mb-4 md:mb-6"
        >
          <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-3 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="glass-card-hover rounded-2xl md:rounded-[32px] overflow-hidden cursor-pointer group"
              >
                {/* Color accent header */}
                <div className={`h-24 md:h-32 bg-gradient-to-br ${post.gradient} relative overflow-hidden flex items-center justify-center`}>
                  <motion.span
                    className="text-4xl md:text-6xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  >
                    {post.emoji}
                  </motion.span>
                  <div className="absolute top-2 md:top-3 left-2 md:left-3">
                    <span className="px-2 md:px-3 py-0.5 md:py-1 bg-white/30 backdrop-blur-sm rounded-full text-[10px] md:text-xs text-white font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-5">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <span className="text-[10px] md:text-xs text-gray-500">{post.date}</span>
                  </div>

                  <h3 className="text-sm md:text-lg font-bold mb-1.5 md:mb-2 text-gray-800 group-hover:text-sky-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-3 md:mb-4 line-clamp-2 text-xs md:text-sm">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1 md:gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 md:px-2.5 py-0.5 md:py-1 bg-white/50 text-gray-600 rounded-lg text-[10px] md:text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card rounded-2xl md:rounded-[32px] p-8 md:p-12 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl md:text-5xl mb-3 md:mb-4"
            >
              🔍
            </motion.div>
            <p className="text-base md:text-lg text-gray-600">暂无该分类的文章</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Blog

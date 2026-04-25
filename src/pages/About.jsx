import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function About() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 md:pt-28 pb-16 md:pb-20 px-3 md:px-8 min-h-screen"
    >
      <div className="container mx-auto max-w-4xl">
        {/* 返回按钮 */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 md:gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6 px-3 md:px-4 py-2 glass-card rounded-xl md:rounded-2xl text-sm md:text-base"
        >
          ← 返回首页
        </motion.button>

        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-8 mb-4 md:mb-6 text-center"
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">
            <span className="text-gradient">关于网站</span>
          </h1>
          <p className="text-gray-600 text-xs md:text-base">记录技术、分享想法、探索无限可能</p>
        </motion.div>

        {/* 网站介绍 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-6 lg:p-8 mb-4 md:mb-6"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">🌐 网站简介</h2>
          <div className="text-sm md:text-base text-gray-700 leading-relaxed space-y-3 md:space-y-4">
            <p>
              这是一个个人博客网站，由upinking和journey共同完成，致力于记录和分享在技术领域的学习心得与实践经验。
            </p>
            <p>
              联系地址&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;upinking:江西省南昌市红谷滩区南昌大学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;journey:上海市浦东新区上海海洋大学
            </p>
            <p>
              在这里，你可以找到关于前端开发、React、CSS 动画、TypeScript 等技术主题的深度文章，
              以及一些实用的小工具来提升你的工作效率。
            </p>

          </div>
        </motion.div>

        {/* 技术栈 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-6 lg:p-8 mb-4 md:mb-6"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">⚡ 技术栈</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {[
              { name: 'React 18', icon: '⚛️', desc: '现代 UI 框架' },
              { name: 'Vite', icon: '🚀', desc: '极速构建工具' },
              { name: 'Tailwind CSS', icon: '🎨', desc: '实用优先 CSS' },
              { name: 'Framer Motion', icon: '✨', desc: '流畅动画库' },
              { name: 'React Router', icon: '🔗', desc: '路由管理' },
              { name: 'LocalStorage', icon: '💾', desc: '本地数据存储' },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-white/50 rounded-xl md:rounded-2xl p-3 md:p-4 text-center"
              >
                <div className="text-2xl md:text-3xl mb-1.5 md:mb-2">{tech.icon}</div>
                <div className="text-xs md:text-sm font-medium text-gray-800">{tech.name}</div>
                <div className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">{tech.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 网站特色 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-6 lg:p-8 mb-4 md:mb-6"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">💡 网站特色</h2>
          <div className="space-y-3 md:space-y-4">
            {[
              { icon: '🎨', title: '精美设计', desc: '采用玻璃拟态设计风格，渐变色彩搭配，带来舒适的视觉体验' },
              { icon: '✨', title: '流畅动画', desc: '丰富的页面动画效果，让交互更加生动有趣' },
              { icon: '📱', title: '响应式布局', desc: '完美适配桌面端和移动端，随时随地访问' },
              { icon: '✍️', title: '写文章功能', desc: '支持在线编写和发布博客文章，内容存储在本地' },
              { icon: '🛠️', title: '实用工具', desc: '内置待办事项、计时器、颜色选择器等实用工具' },
              { icon: '🌙', title: '个性主页', desc: '精心设计的 Bento Grid 布局，展示时间和个性化内容' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/40 rounded-xl md:rounded-2xl"
              >
                <span className="text-xl md:text-2xl flex-shrink-0">{feature.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-800 mb-0.5 md:mb-1 text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 联系方式 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-6 lg:p-8 text-center"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">📬 联系我</h2>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">如果你有任何问题或建议，欢迎通过以下方式联系我</p>
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://space.bilibili.com/520614921"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-xl md:rounded-2xl font-medium flex items-center gap-2 text-sm md:text-base"
            >
              <span>📺</span> Bilibili
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="px-4 md:px-6 py-2.5 md:py-3 bg-gray-900 text-white rounded-xl md:rounded-2xl font-medium flex items-center gap-2 text-sm md:text-base"
            >
              <span>💻</span> GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default About

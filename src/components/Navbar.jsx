import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/blog', label: '博客' },
    { path: '/tools', label: '工具' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 p-2 md:p-3"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="glass-card rounded-xl md:rounded-2xl px-3 md:px-5 py-2 md:py-2.5 flex items-center justify-between">
          <Link to="/" className="text-base md:text-lg font-bold">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-gradient"
            >
              ✨ 我的博客
            </motion.span>
          </Link>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              )
            })}
            <Link to="/blog/write">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-xl text-sm font-medium"
              >
                ✍️ 写文章
              </motion.div>
            </Link>
          </div>

          {/* 移动端汉堡菜单按钮 */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/50 transition-colors"
          >
            <div className="flex flex-col justify-center items-center w-5 h-5">
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'my-1'}`} />
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </motion.button>
        </div>
      </div>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 overflow-hidden"
          >
            <div className="glass-card rounded-xl p-3 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white'
                          : 'text-gray-600 hover:bg-white/50'
                      }`}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                )
              })}
              <Link
                to="/blog/write"
                onClick={() => setIsMenuOpen(false)}
              >
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-xl text-sm font-medium text-center"
                >
                  ✍️ 写文章
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

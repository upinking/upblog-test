import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const gradients = [
  'from-blue-400 to-cyan-400',
  'from-purple-400 to-pink-400',
  'from-orange-400 to-red-400',
  'from-green-400 to-emerald-400',
  'from-teal-400 to-cyan-400',
  'from-emerald-400 to-green-400',
]

const emojis = ['⚛️', '🎨', '', '🚀', '🌊', '💚', '💡', '', '✨', '🎯']

const categoryOptions = ['React', 'CSS', 'TypeScript', 'Node.js', 'Vue', '其他']

function WritePost() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'React',
    tags: '',
    content: '',
  })
  const [selectedGradient, setSelectedGradient] = useState(gradients[0])
  const [selectedEmoji, setSelectedEmoji] = useState(emojis[0])
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // 获取已有文章
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]')

    // 生成新文章 ID
    const newId = existingPosts.length > 0 
      ? Math.max(...existingPosts.map(p => p.id)) + 1 
      : 7

    // 创建新文章
    const newPost = {
      id: newId,
      title: formData.title,
      excerpt: formData.excerpt,
      date: new Date().toISOString().split('T')[0],
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      gradient: selectedGradient,
      emoji: selectedEmoji,
      content: formData.content,
      readTime: `${Math.max(1, Math.ceil(formData.content.length / 500))} 分钟`,
    }

    // 保存到 localStorage
    localStorage.setItem('blogPosts', JSON.stringify([...existingPosts, newPost]))

    setSaved(true)

    // 2秒后跳转到博客列表
    setTimeout(() => {
      navigate('/blog')
    }, 2000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

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
          onClick={() => navigate('/blog')}
          className="flex items-center gap-1.5 md:gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6 px-3 md:px-4 py-2 glass-card rounded-xl md:rounded-2xl text-sm md:text-base"
        >
          ← 返回博客列表
        </motion.button>

        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-8 mb-4 md:mb-6 text-center"
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">
            <span className="text-gradient">✍️ 写文章</span>
          </h1>
          <p className="text-gray-600 text-xs md:text-base">分享你的想法和技术见解</p>
        </motion.div>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-100 text-green-800 rounded-2xl text-center"
          >
            ✅ 文章已保存！正在跳转到博客列表...
          </motion.div>
        )}

        {/* 表单 */}
        <form onSubmit={handleSubmit}>
          {/* 基本信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-6 lg:p-8 mb-4 md:mb-6"
          >
            <h2 className="text-base md:text-xl font-bold text-gray-800 mb-4 md:mb-6">📝 基本信息</h2>

            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  文章标题 *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="输入文章标题..."
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  文章摘要 *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="简短描述文章内容..."
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none text-sm md:text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    分类 *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm md:text-base"
                  >
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    标签（用逗号分隔）
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="React, 教程, 入门"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm md:text-base"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 样式选择 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-6 lg:p-8 mb-4 md:mb-6"
          >
            <h2 className="text-base md:text-xl font-bold text-gray-800 mb-4 md:mb-6">🎨 样式选择</h2>

            <div className="mb-4 md:mb-6">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">
                选择颜色主题
              </label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {gradients.map(gradient => (
                  <button
                    key={gradient}
                    type="button"
                    onClick={() => setSelectedGradient(gradient)}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${gradient} transition-all ${
                      selectedGradient === gradient ? 'ring-2 md:ring-4 ring-white shadow-lg scale-110' : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">
                选择图标
              </label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {emojis.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl transition-all ${
                      selectedEmoji === emoji ? 'bg-white shadow-lg scale-110' : 'bg-white/50 hover:bg-white/80'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 文章内容 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-6 lg:p-8 mb-4 md:mb-6"
          >
            <h2 className="text-base md:text-xl font-bold text-gray-800 mb-4 md:mb-6">📄 文章内容</h2>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="20"
              placeholder={`在这里写文章内容...\n\n支持 Markdown 格式：\n\n## 二级标题\n\n### 三级标题\n\n**加粗文字**\n\n\`代码块\`\n\n- 列表项`}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none font-mono text-xs md:text-sm"
            />

            <p className="mt-2 md:mt-3 text-[10px] md:text-sm text-gray-500">
              💡 提示：使用 Markdown 语法来格式化你的文章
            </p>
          </motion.div>

          {/* 提交按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2 md:gap-4"
          >
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="flex-1 py-3 md:py-4 glass-card rounded-xl md:rounded-2xl text-gray-700 hover:bg-white/80 transition-all font-medium text-sm md:text-base"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 py-3 md:py-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-xl md:rounded-2xl hover:shadow-lg transition-all font-medium text-sm md:text-base"
            >
              ✨ 发布文章
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  )
}

export default WritePost

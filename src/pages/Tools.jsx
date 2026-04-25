import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Todo Tool Component
function TodoTool() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="添加新任务..."
          className="flex-1 px-4 py-3 bg-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addTodo}
          className="px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-2xl font-medium"
        >
          添加
        </motion.button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              className="flex items-center gap-3 p-3 bg-white/40 rounded-2xl"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleTodo(todo.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  todo.completed 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-transparent' 
                    : 'border-gray-400'
                }`}
              >
                {todo.completed && <span className="text-white text-xs">✓</span>}
              </motion.button>
              
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {todo.text}
              </span>

              <motion.button
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                ×
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Timer Tool Component
function TimerTool() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="text-center space-y-6">
      <motion.div
        animate={isRunning ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
        className="text-5xl font-mono font-bold text-gradient"
      >
        {formatTime(time)}
      </motion.div>

      <div className="flex gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-3 rounded-2xl font-medium text-white ${
            isRunning 
              ? 'bg-gradient-to-r from-orange-500 to-red-500' 
              : 'bg-gradient-to-r from-green-500 to-emerald-500'
          }`}
        >
          {isRunning ? '暂停' : '开始'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsRunning(false)
            setTime(0)
          }}
          className="px-8 py-3 bg-white/50 rounded-2xl font-medium text-gray-700"
        >
          重置
        </motion.button>
      </div>
    </div>
  )
}

// Color Picker Tool Component
function ColorPickerTool() {
  const [color, setColor] = useState('#0ea5e9')
  const [copied, setCopied] = useState(false)

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-24 h-24 rounded-2xl cursor-pointer"
        />
        <div className="flex-1 space-y-2">
          <div className="p-4 bg-white/50 rounded-2xl">
            <div className="text-sm text-gray-600 mb-1">HEX</div>
            <div className="font-mono text-xl">{color}</div>
          </div>
          <div className="p-4 bg-white/50 rounded-2xl">
            <div className="text-sm text-gray-600 mb-1">RGB</div>
            <div className="font-mono text-xl">{hexToRgb(color)}</div>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyToClipboard}
        className="w-full py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-2xl font-medium"
      >
        {copied ? '✓ 已复制!' : '复制颜色值'}
      </motion.button>

      <div 
        className="h-20 rounded-2xl shadow-inner"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

// Notes Tool Component
function NotesTool() {
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('blog-notes')
    if (saved) setNotes(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('blog-notes', notes)
  }, [notes])

  return (
    <div className="space-y-4">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="在这里写下你的想法..."
        className="w-full h-64 p-4 bg-white/50 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <div className="text-sm text-gray-600 text-right">
        {notes.length} 字符
      </div>
    </div>
  )
}

// Main Tools Page
function Tools() {
  const [activeTool, setActiveTool] = useState('todo')

  const tools = [
    { id: 'todo', name: '待办事项', icon: '✓', gradient: 'from-blue-400 to-cyan-400' },
    { id: 'timer', name: '计时器', icon: '⏱', gradient: 'from-purple-400 to-pink-400' },
    { id: 'color', name: '颜色选择器', icon: '🎨', gradient: 'from-orange-400 to-red-400' },
    { id: 'notes', name: '快速笔记', icon: '📝', gradient: 'from-green-400 to-emerald-400' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 md:pt-28 pb-16 md:pb-20 px-3 md:px-8 min-h-screen"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-8 mb-4 md:mb-6 text-center"
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">
            <span className="text-gradient">实用工具</span>
          </h1>
          <p className="text-gray-600 text-xs md:text-base">提升效率的小帮手</p>
        </motion.div>

        {/* Tool Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6"
        >
          {tools.map((tool) => (
            <motion.button
              key={tool.id}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTool(tool.id)}
              className={`p-3 md:p-5 rounded-xl md:rounded-2xl font-medium transition-all ${
                activeTool === tool.id
                  ? `bg-gradient-to-r ${tool.gradient} text-white shadow-lg`
                  : 'glass-card-hover text-gray-700'
              }`}
            >
              <div className="text-2xl md:text-3xl mb-1.5 md:mb-2">{tool.icon}</div>
              <div className="text-xs md:text-sm">{tool.name}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Tool */}
        <motion.div
          key={activeTool}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="glass-card rounded-2xl md:rounded-[32px] p-4 md:p-6"
        >
          <AnimatePresence mode="wait">
            {activeTool === 'todo' && <TodoTool />}
            {activeTool === 'timer' && <TimerTool />}
            {activeTool === 'color' && <ColorPickerTool />}
            {activeTool === 'notes' && <NotesTool />}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Tools

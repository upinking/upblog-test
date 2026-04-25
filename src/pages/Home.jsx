import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { defaultPosts } from './Blog'

function ClockWidget() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
      className="glass-card rounded-xl md:rounded-2xl p-3 md:p-5"
    >
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold text-gradient"
        >
          {formatTime(time)}
        </motion.div>
        <div className="text-gray-500 text-xs md:text-sm mt-1">
          {time.getFullYear()}年{time.getMonth() + 1}月{time.getDate()}日
        </div>
      </div>
    </motion.div>
  )
}

function CalendarWidget() {
  const [currentDate] = useState(new Date())

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const days = getDaysInMonth(currentDate)
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
      className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4"
    >
      <div className="text-xs md:text-sm font-medium text-gray-600 mb-2">
        {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] md:text-xs">
        {weekDays.map(day => (
          <div key={day} className="text-gray-400 py-0.5">{day}</div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`py-0.5 md:py-1 rounded ${
              day === currentDate.getDate()
                ? 'bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold'
                : day
                ? 'text-gray-600 hover:bg-white/50'
                : ''
            }`}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ProfileWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4"
    >
      <div className="flex flex-col items-center text-center h-full justify-center">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 p-0.5 mb-2"
        >
          <div className="w-full h-full rounded-full bg-white/50 flex items-center justify-center text-xl md:text-3xl">
            👋
          </div>
        </motion.div>
        <h2 className="text-base md:text-lg font-bold text-gray-800 mb-0.5">你好,访客!</h2>
        <p className="text-gray-600 text-[10px] md:text-xs mb-2">
          欢迎来到我的个人博客
        </p>
        <div className="flex gap-1.5 flex-wrap justify-center">
          <motion.a
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href={"https://github.com/upinking"}
            className="px-2.5 md:px-3 py-1 md:py-1.5 bg-gray-900 text-white rounded-lg text-xs md:text-sm flex items-center gap-1.5"
          >
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href={"https://space.bilibili.com/520614921?spm_id_from=333.1387.fans.user_card.click"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-lg text-xs md:text-sm flex items-center gap-1.5"
          >
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c0-.356.124-.658.373-.907.25-.249.552-.373.907-.373h5.44c.356 0 .658.124.907.373.249.25.373.551.373.907v5.44c0 .355-.124.658-.373.906-.25.25-.551.374-.907.374H9.28c-.355 0-.658-.125-.907-.374-.249-.248-.373-.551-.373-.906v-5.44zm1.28 5.12h2.88V12.36H9.28v3.867z"/>
            </svg>
            Bilibili
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

function MusicPlayerWidget() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4"
    >
      <div className="flex items-center gap-2">
        <motion.div
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
          className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-sm"
        >
          🎵
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-gray-700 truncate">Close To You</div>
          <div className="text-[10px] text-gray-500 truncate">Carpenters</div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white flex items-center justify-center text-sm"
        >
          {isPlaying ? '⏸' : '▶'}
        </motion.button>
      </div>
    </motion.div>
  )
}

const weatherCodeMap = {
  0: { emoji: '☀️', desc: '晴' },
  1: { emoji: '🌤️', desc: '大部晴' },
  2: { emoji: '⛅', desc: '多云' },
  3: { emoji: '☁️', desc: '阴' },
  45: { emoji: '🌫️', desc: '雾' },
  48: { emoji: '🌫️', desc: '雾凇' },
  51: { emoji: '🌦️', desc: '小毛毛雨' },
  53: { emoji: '🌦️', desc: '毛毛雨' },
  55: { emoji: '🌦️', desc: '大毛毛雨' },
  61: { emoji: '🌧️', desc: '小雨' },
  63: { emoji: '🌧️', desc: '中雨' },
  65: { emoji: '🌧️', desc: '大雨' },
  66: { emoji: '🌧️', desc: '冻雨' },
  67: { emoji: '🌧️', desc: '大冻雨' },
  71: { emoji: '🌨️', desc: '小雪' },
  73: { emoji: '🌨️', desc: '中雪' },
  75: { emoji: '❄️', desc: '大雪' },
  77: { emoji: '🌨️', desc: '雪粒' },
  80: { emoji: '🌧️', desc: '小阵雨' },
  81: { emoji: '🌧️', desc: '阵雨' },
  82: { emoji: '🌧️', desc: '大阵雨' },
  85: { emoji: '🌨️', desc: '小阵雪' },
  86: { emoji: '❄️', desc: '大阵雪' },
  95: { emoji: '⛈️', desc: '雷暴' },
  96: { emoji: '⛈️', desc: '雷暴冰雹' },
  99: { emoji: '⛈️', desc: '雷暴大冰雹' },
}

function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('')

  useEffect(() => {
    let cancelled = false

    const fetchWeather = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
        )
        const data = await res.json()
        if (!cancelled) {
          setWeather(data.current_weather)
        }
      } catch (e) {
        if (!cancelled) {
          setWeather(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    const reverseGeocode = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=zh`
        )
        const data = await res.json()
        if (!cancelled && data.address) {
          const addr = data.address
          const cityName = addr.city || addr.town || addr.county || addr.state || addr.country || ''
          setCity(cityName)
        }
      } catch (e) {
        if (!cancelled) {
          setCity('')
        }
      }
    }

    const geoTimeout = setTimeout(() => {
      if (!cancelled) {
        fetchWeather(28.68, 115.89)
        setCity('南昌')
      }
    }, 3000)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          clearTimeout(geoTimeout)
          if (!cancelled) {
            const { latitude, longitude } = pos.coords
            fetchWeather(latitude, longitude)
            reverseGeocode(latitude, longitude)
          }
        },
        () => {
          clearTimeout(geoTimeout)
          if (!cancelled) {
            fetchWeather(28.68, 115.89)
            setCity('南昌')
          }
        },
        { timeout: 3000 }
      )
    } else {
      clearTimeout(geoTimeout)
      fetchWeather(28.68, 115.89)
      setCity('南昌')
    }

    return () => {
      cancelled = true
      clearTimeout(geoTimeout)
    }
  }, [])

  const weatherInfo = weather ? (weatherCodeMap[weather.weathercode] || { emoji: '🌈', desc: '未知' }) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4"
    >
      {loading ? (
        <div className="flex items-center justify-center py-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="text-xl"
          >
            🌐
          </motion.div>
          <span className="text-xs text-gray-500 ml-2">获取天气中...</span>
        </div>
      ) : weather && weatherInfo ? (
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl md:text-4xl"
          >
            {weatherInfo.emoji}
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-2xl font-bold text-gray-800">{weather.temperature}°C</span>
              <span className="text-xs md:text-sm text-gray-500">{weatherInfo.desc}</span>
            </div>
            <div className="text-[10px] md:text-xs text-gray-400 truncate">
              📍 {city || '未知位置'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] md:text-xs text-gray-500">
              💨 {weather.windspeed} km/h
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-2 text-xs text-gray-500">天气获取失败</div>
      )}
    </motion.div>
  )
}

function NavWidget({ onNavigate }) {
  const navItems = [
    { icon: '📝', label: '近期文章', path: '/blog' },
    { icon: '', label: '我的项目', path: '/tools' },
    { icon: '💡', label: '关于网站', path: '/about' },
    { icon: '⭐', label: '推荐分享', path: '/recommend' },
    { icon: '🌐', label: '优秀博客', path: '/links' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4"
    >
      <div className="text-[10px] md:text-xs text-gray-500 uppercase mb-2 font-medium">导航</div>
      <div className="space-y-0.5 md:space-y-1">
        {navItems.map((item, index) => (
          <motion.button
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.8)' }}
            onClick={() => onNavigate(item.path)}
            className="w-full flex items-center gap-2 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg text-left text-gray-700 hover:text-gray-900 transition-colors"
          >
            <span className="text-lg md:text-xl">{item.icon}</span>
            <span className="text-xs md:text-sm font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

function RecentPostsWidget({ onNavigate }) {
  const latestPosts = [...defaultPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4"
    >
      <div className="text-xs md:text-sm font-medium text-gray-600 mb-2">最新文章</div>
      <div className="space-y-1.5 md:space-y-2">
        {latestPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.6)' }}
            onClick={() => onNavigate(`/blog/${post.id}`)}
            className="flex items-center gap-2 md:gap-3 p-2 rounded-lg cursor-pointer transition-colors"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-xl md:text-2xl flex-shrink-0">
              {post.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 text-xs md:text-sm truncate">{post.title}</div>
              <div className="text-[10px] md:text-xs text-gray-500 truncate">{post.excerpt}</div>
            </div>
            <div className="text-[10px] md:text-xs text-gray-400 flex-shrink-0">{post.date}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function GreetingWidget() {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 6) return '夜深了'
    if (hour < 9) return '早上好'
    if (hour < 12) return '上午好'
    if (hour < 14) return '中午好'
    if (hour < 18) return '下午好'
    if (hour < 22) return '晚上好'
    return '夜深了'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
      className="glass-card rounded-xl md:rounded-2xl p-3 md:p-5"
    >
      <div className="flex items-center gap-3 md:gap-4">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl md:text-5xl"
        >
          ☁️
        </motion.div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">{getGreeting()}</h2>
          <p className="text-gray-600 text-xs md:text-sm">
            We are <span className="text-gradient font-bold">journey and upinking</span>, Nice to meet you!
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function Home() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 md:pt-20 pb-4 md:pb-6 px-3 md:px-6"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          <div className="col-span-2">
            <GreetingWidget />
          </div>

          <div className="col-span-2">
            <WeatherWidget />
          </div>

          <div className="col-span-2">
            <ClockWidget />
          </div>

          <div className="col-span-2 md:col-span-1">
            <CalendarWidget />
          </div>

          <div className="col-span-1">
            <MusicPlayerWidget />
          </div>

          <div className="col-span-2 md:col-span-1">
            <NavWidget onNavigate={navigate} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <ProfileWidget />
          </div>

          <div className="col-span-2 md:col-span-2">
            <RecentPostsWidget onNavigate={navigate} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Home

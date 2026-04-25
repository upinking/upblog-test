import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import WritePost from './pages/WritePost'
import Tools from './pages/Tools'
import About from './pages/About'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blog/write" element={<WritePost />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App

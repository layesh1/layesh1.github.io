import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import Experience from './components/Experience'
import Research from './components/Research'
import Achievements from './components/Achievements'
import Blog from './components/Blog'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import ScrollToTop from './components/ScrollToTop'
import { ExitModalProvider } from './components/ExitModal'

export default function App() {
  return (
    <BrowserRouter>
      <ExitModalProvider>
        <ScrollToTop />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/research" element={<Research />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
        <MusicPlayer />
      </ExitModalProvider>
    </BrowserRouter>
  )
}

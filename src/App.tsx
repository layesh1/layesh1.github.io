import Nav from './components/Nav'
import Home from './components/Home'
import Experience from './components/Experience'
import Research from './components/Research'
import Achievements from './components/Achievements'
import Blog from './components/Blog'
import Footer from './components/Footer'
import { ExitModalProvider } from './components/ExitModal'

export default function App() {
  return (
    <ExitModalProvider>
      <Nav />
      <main>
        <Home />
        <Experience />
        <Research />
        <Achievements />
        <Blog />
      </main>
      <Footer />
    </ExitModalProvider>
  )
}

import { useState, useEffect, type CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'home',         href: '/' },
  { label: 'experience',   href: '/experience' },
  { label: 'research',     href: '/research' },
  { label: 'achievements', href: '/achievements' },
  { label: 'extra, extra', href: '/blog' },
]

/* ── Sparkle burst — marks the "extra, extra" link as a bit different ── */
const SPARKLE_SPRITES = [
  '/assets/sparkles/star-solid.png',
  '/assets/sparkles/star-hollow.png',
  '/assets/sparkles/star-gray.png',
  '/assets/sparkles/sparkle-cross.png',
]

const SPARKLE_SLOTS: { style: CSSProperties; size: number; delay: number }[] = [
  { style: { top: -14, left: -12 },              size: 14, delay: 0 },
  { style: { top: -18, left: '50%' },             size: 12, delay: 0.08 },
  { style: { top: -12, right: -14 },              size: 16, delay: 0.05 },
  { style: { top: '50%', left: -20 },             size: 10, delay: 0.12 },
  { style: { top: '50%', right: -18 },            size: 13, delay: 0.15 },
  { style: { bottom: -14, left: -10 },            size: 11, delay: 0.1 },
  { style: { bottom: -16, left: '50%' },          size: 15, delay: 0.18 },
  { style: { bottom: -14, right: -12 },           size: 12, delay: 0.07 },
]

function SparkleBurst({ active }: { active: boolean }) {
  return (
    <>
      {SPARKLE_SLOTS.map((slot, i) => (
        <motion.img
          key={i}
          src={SPARKLE_SPRITES[i % SPARKLE_SPRITES.length]}
          alt=""
          draggable={false}
          className="absolute pointer-events-none select-none"
          style={{ ...slot.style, width: slot.size, height: 'auto' }}
          animate={
            active
              ? { opacity: [0, 1, 1, 0.6, 1], scale: [0, 1.3, 1, 0.9, 1], rotate: [0, 15, -15, 8, 0] }
              : { opacity: 0, scale: 0, rotate: 0 }
          }
          transition={
            active
              ? { duration: 1.4, repeat: Infinity, delay: slot.delay, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
        />
      ))}
    </>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [sparkling, setSparkling] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href)
  }

  function triggerSparkle() {
    setSparkling(true)
    setTimeout(() => setSparkling(false), 1000)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-blur border-b border-border/30 shadow-sm' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Wordmark */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-display font-bold text-lg tracking-tight hover:opacity-70 transition-opacity"
        >
          lena ayesh
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => {
            const isExtra = l.href === '/blog'
            return (
              <li
                key={l.href}
                className="relative"
                onMouseEnter={isExtra ? () => setSparkling(true) : undefined}
                onMouseLeave={isExtra ? () => setSparkling(false) : undefined}
              >
                <Link
                  to={l.href}
                  onClick={isExtra ? triggerSparkle : undefined}
                  className={`font-display text-sm font-medium lowercase tracking-wide transition-colors relative pb-0.5 block ${
                    isActive(l.href) ? 'text-dark' : 'text-muted hover:text-dark'
                  }`}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-purple rounded-full"
                    />
                  )}
                </Link>
                {isExtra && <SparkleBurst active={sparkling} />}
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-dark transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-dark transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-dark transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden nav-blur border-b border-border/30 px-6 pb-6"
          >
            <ul className="flex flex-col gap-4 pt-2">
              {links.map(l => {
                const isExtra = l.href === '/blog'
                return (
                  <li key={l.href} className="relative w-fit">
                    <Link
                      to={l.href}
                      onClick={() => {
                        setOpen(false)
                        if (isExtra) triggerSparkle()
                      }}
                      className="font-display text-base font-medium lowercase"
                    >
                      {l.label}
                    </Link>
                    {isExtra && <SparkleBurst active={sparkling} />}
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Context ── */
type ExitCtx = { openExit: (url: string) => void }
const ExitContext = createContext<ExitCtx>({ openExit: (url) => window.open(url, '_blank', 'noopener,noreferrer') })

export function useExitLink() {
  return useContext(ExitContext)
}

/* ── Provider — wrap the whole app ── */
export function ExitModalProvider({ children }: { children: React.ReactNode }) {
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)

  function openExit(url: string) {
    const alreadyWarned = sessionStorage.getItem('lena-exit-warned')
    if (alreadyWarned) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      setPendingUrl(url)
    }
  }

  return (
    <ExitContext.Provider value={{ openExit }}>
      {children}
      <AnimatePresence>
        {pendingUrl && (
          <ExitConfirm url={pendingUrl} onClose={() => setPendingUrl(null)} />
        )}
      </AnimatePresence>
    </ExitContext.Provider>
  )
}

/* ── Drop-in replacement for <a> on external links ── */
export function ExternalLink({
  href,
  children,
  className,
  style,
}: {
  href: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const { openExit } = useExitLink()

  // Only intercept real external URLs (not '#' placeholders)
  const isExternal = href && href.startsWith('http')

  return (
    <a
      href={href}
      className={className}
      style={style}
      rel="noopener noreferrer"
      onClick={(e) => {
        if (!isExternal) { e.preventDefault(); return }
        e.preventDefault()
        openExit(href)
      }}
    >
      {children}
    </a>
  )
}

/* ── The actual modal ── */
function ExitConfirm({ url, onClose }: { url: string; onClose: () => void }) {
  function dismiss() {
    sessionStorage.setItem('lena-exit-warned', '1')
    onClose()
  }
  function go() {
    sessionStorage.setItem('lena-exit-warned', '1')
    window.open(url, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="bg-parchment border-2 border-border rounded-sm shadow-[8px_8px_0_#2D2D2D] max-w-xs w-full p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Monkey photo */}
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-border shadow-md">
          <img
            src="./assets/monkey.jpg"
            alt="wait!"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 20%' }}
          />
        </div>

        <p className="font-display font-bold text-xl mb-2">wait!</p>
        <p className="font-body text-sm text-dark leading-relaxed mb-6">
          you do know you are leaving{' '}
          <span className="font-semibold underline decoration-dotted underline-offset-2">
            MY
          </span>{' '}
          website... right? :'{')'}
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={go}
            className="w-full py-2 border-2 border-border bg-white/60 hover:bg-rose/10 hover:border-rose/60 transition-colors font-display font-semibold text-sm rounded-sm"
          >
            continue →
          </button>
          <button
            onClick={dismiss}
            className="w-full py-2 border-2 border-border bg-green/10 hover:bg-green/20 transition-colors font-display font-semibold text-sm rounded-sm text-green-800"
          >
            back to my website
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

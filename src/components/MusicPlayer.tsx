import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PLAYLIST_ID = '6Ekm8OVeOJsdhYY269GgHd'
const PLAYLIST_NAME = 'once bitten... twice shy'

/* ── Folder icon — no frame, just the cutout. Wobbles on hover. ── */
function FolderIcon() {
  return (
    <motion.img
      src="/assets/music-folder.png"
      alt=""
      className="w-16 h-16 object-contain"
      draggable={false}
      whileHover={{
        rotate: [0, -8, 8, -8, 0],
        scale: 1.06,
        transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  )
}

export default function MusicPlayer() {
  const [open, setOpen] = useState(false)
  const [everOpened, setEverOpened] = useState(false)

  function toggle() {
    setOpen(o => {
      const next = !o
      if (next) setEverOpened(true)
      return next
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2">
      {/* Player card — iframe only ever mounts after the first open */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="bg-white border-2 border-border rounded-sm shadow-[4px_4px_0_#2D2D2D] p-3 w-[300px]"
          >
            <p className="mono text-xs text-muted mb-2 lowercase truncate">{PLAYLIST_NAME}</p>
            {everOpened && (
              <iframe
                title={`Spotify playlist: ${PLAYLIST_NAME}`}
                src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator`}
                width="100%"
                height="352"
                style={{ borderRadius: 12, border: 'none' }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button — music notes float out of the folder as an idle hint, until clicked */}
      <div className="relative flex items-center justify-center">
        <AnimatePresence>
          {!open && (
            <motion.div
              key="notes"
              className="absolute -top-8 -right-2 pointer-events-none select-none"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
            >
              <motion.img
                src="/assets/music-notes.png"
                alt=""
                draggable={false}
                className="w-16"
                style={{ transform: 'rotate(-6deg)' }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggle}
          aria-label={open ? 'Pause music player' : 'Play music player'}
          aria-pressed={open}
          className="bg-transparent border-none p-0 flex items-center justify-center cursor-pointer"
        >
          <FolderIcon />
        </button>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bcazwcpvglbmvmbdtcze.supabase.co',
  'sb_publishable_ytnohFpZD6BX_ocHKfp0GA_rk3TPjO5',
)

/* ── Pre-seeded notes ── */
const SEED_NOTES = [
  { id: 'seed-1', bg: 'sticky1', text: 'erm....' },
  { id: 'seed-2', bg: 'sticky3', text: 'onika burger' },
]

const STICKY_IMGS: Record<string, string> = {
  sticky1: './assets/sticky1.png',
  sticky2: './assets/sticky2.png',
  sticky3: './assets/sticky3.png',
  sticky4: './assets/sticky4.png',
}

const STICKY_KEYS = Object.keys(STICKY_IMGS)

type Note = { id: string; bg: string; text: string }

/* ── Single sticky note display ── */
function StickyNote({ note, rotation = 0 }: { note: Note; rotation?: number }) {
  return (
    <div className="relative select-none" style={{ transform: `rotate(${rotation}deg)`, width: 220, height: 220 }}>
      <img
        src={STICKY_IMGS[note.bg] ?? STICKY_IMGS.sticky1}
        alt=""
        className="absolute inset-0 w-full h-full object-cover rounded-sm"
        draggable={false}
      />
      <div
        className="absolute inset-0 flex items-center justify-center p-6"
        style={{ paddingTop: '2.5rem' }}
      >
        <p
          className="font-body text-sm text-center leading-snug"
          style={{
            fontFamily: "'Lora', Georgia, serif",
            color: '#2D2417',
            fontSize: '0.78rem',
            lineHeight: 1.55,
            textShadow: 'none',
          }}
        >
          {note.text}
        </p>
      </div>
    </div>
  )
}

/* ── Write-a-note modal ── */
function WriteNoteModal({ onSubmit, onClose }: { onSubmit: (text: string, bg: string) => void; onClose: () => void }) {
  const [text, setText] = useState('')
  const [chosen, setChosen] = useState(STICKY_KEYS[Math.floor(Math.random() * STICKY_KEYS.length)])
  const maxLen = 140

  function submit() {
    const trimmed = text.trim()
    if (!trimmed) return
    onSubmit(trimmed, chosen)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="bg-parchment border-2 border-border rounded-sm shadow-[8px_8px_0_#2D2D2D] max-w-md w-full p-6"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="font-display font-bold text-lg mb-4 lowercase">leave a note</h3>

        {/* Sticky picker */}
        <div className="flex gap-2 mb-4">
          {STICKY_KEYS.map(k => (
            <button
              key={k}
              onClick={() => setChosen(k)}
              className={`w-10 h-10 rounded-sm overflow-hidden border-2 transition-all ${chosen === k ? 'border-border scale-110' : 'border-transparent opacity-60 hover:opacity-90'}`}
            >
              <img src={STICKY_IMGS[k]} alt={k} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Preview + textarea */}
        <div className="relative mx-auto mb-4" style={{ width: 220, height: 220 }}>
          <img
            src={STICKY_IMGS[chosen]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-sm"
          />
          <textarea
            autoFocus
            value={text}
            onChange={e => setText(e.target.value.slice(0, maxLen))}
            placeholder="type your confession..."
            className="absolute inset-0 w-full h-full bg-transparent resize-none outline-none text-center"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '0.78rem',
              lineHeight: 1.55,
              color: '#2D2417',
              padding: '2.5rem 1.5rem 1rem',
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="mono text-xs text-muted">{text.length}/{maxLen}</span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border-2 border-border rounded-sm font-display text-sm hover:bg-border/10 transition-colors"
            >
              cancel
            </button>
            <button
              onClick={submit}
              disabled={!text.trim()}
              className="px-4 py-2 border-2 border-border bg-green/10 rounded-sm font-display font-semibold text-sm text-green-800 hover:bg-green/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              drop it in →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Crab ── */
function CrabRave() {
  const [hovered, setHovered] = useState(false)
  const audioRef = useState(() => {
    const a = new Audio('./assets/crab-rave.mp3')
    a.loop = true
    a.volume = 0.35
    return a
  })[0]

  function enter() {
    setHovered(true)
    audioRef.currentTime = 0
    audioRef.play().catch(() => {})
  }
  function leave() {
    setHovered(false)
    audioRef.pause()
    audioRef.currentTime = 0
  }

  return (
    <div
      className="absolute z-20 cursor-pointer"
      style={{ bottom: 60, right: '12%' }}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="absolute"
            style={{ bottom: '110%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', zIndex: 30 }}
          >
            <div
              className="bg-white border-2 border-border rounded-2xl px-3 py-2 shadow-md"
              style={{ fontSize: '0.7rem', fontFamily: "'Lora', serif", color: '#2D2D2D', position: 'relative' }}
            >
              literally cant even have a crab rave without notes
              <div style={{
                position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)',
                width: 0, height: 0, borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent', borderTop: '10px solid #2D2D2D',
              }} />
              <div style={{
                position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
                width: 0, height: 0, borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent', borderTop: '9px solid white',
              }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src="./assets/crab.png"
        alt="crab"
        animate={{
          width: hovered ? 110 : 36,
          rotate: hovered ? [0, -12, 12, -12, 12, 0] : 0,
        }}
        transition={{
          width: { type: 'spring', stiffness: 260, damping: 18 },
          rotate: { duration: 0.5, repeat: hovered ? Infinity : 0, repeatType: 'loop' },
        }}
        style={{ display: 'block' }}
        draggable={false}
      />
    </div>
  )
}

/* ── Hungry fish ── */
function HungryFish() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="absolute z-20 cursor-pointer"
      style={{ bottom: 72, left: '58%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="absolute"
            style={{ bottom: '110%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', zIndex: 30 }}
          >
            {/* Speech bubble */}
            <div
              className="bg-white border-2 border-border rounded-2xl px-3 py-2 shadow-md"
              style={{ fontSize: '0.7rem', fontFamily: "'Lora', serif", color: '#2D2D2D', position: 'relative' }}
            >
              blurb...blurb.... need... more notes...for sustenance
              {/* Bubble tail */}
              <div style={{
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0, height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '10px solid #2D2D2D',
              }} />
              <div style={{
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0, height: 0,
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                borderTop: '9px solid white',
              }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src="./assets/fish.png"
        alt="fish"
        animate={{ width: hovered ? 120 : 38 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        style={{ display: 'block' }}
        draggable={false}
      />
    </div>
  )
}

/* ── Main component ── */
export default function ConfessionJar() {
  const [dbNotes, setDbNotes] = useState<Note[]>([])
  const allNotes = [...SEED_NOTES, ...dbNotes]

  const [viewIdx, setViewIdx] = useState<number | null>(null)
  const [writing, setWriting] = useState(false)
  const [justDropped, setJustDropped] = useState(false)

  useEffect(() => {
    supabase
      .from('confession_notes')
      .select('id, text, bg')
      .order('created_at', { ascending: true })
      .then(({ data }) => { if (data) setDbNotes(data) })
  }, [])

  function pullNote() {
    const idx = Math.floor(Math.random() * allNotes.length)
    setViewIdx(idx)
  }

  function nextNote() {
    setViewIdx(i => i === null ? 0 : (i + 1) % allNotes.length)
  }

  function prevNote() {
    setViewIdx(i => i === null ? 0 : (i - 1 + allNotes.length) % allNotes.length)
  }

  async function addNote(text: string, bg: string) {
    const { data } = await supabase
      .from('confession_notes')
      .insert({ text, bg })
      .select('id, text, bg')
      .single()
    if (data) setDbNotes(prev => [...prev, data])
    setJustDropped(true)
    setTimeout(() => setJustDropped(false), 2200)
  }

  // Fan of notes peeking from bowl
  const peekRotations = [-18, -6, 4, 14, -26]

  return (
    <div className="mt-12 flex flex-col items-center gap-6">

      {/* Title */}
      <div className="text-center">
        <h3 className="font-display font-bold text-lg lowercase">the confession jar</h3>
        <p className="mono text-xs text-muted mt-1">
          {allNotes.length} note{allNotes.length !== 1 ? 's' : ''} inside
        </p>
      </div>

      {/* Bowl + peeking notes */}
      <div className="relative flex flex-col items-center" style={{ width: 280 }}>

        {/* Notes fanned behind bowl */}
        <div className="absolute" style={{ bottom: 40, left: '50%', transform: 'translateX(-50%)' }}>
          {allNotes.slice(0, 5).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: 60,
                height: 70,
                bottom: 0,
                left: -30,
                transform: `rotate(${peekRotations[i]}deg) translateY(-${18 + i * 4}px)`,
                zIndex: i,
              }}
            >
              <img
                src={STICKY_IMGS[allNotes[i].bg]}
                alt=""
                className="w-full h-full object-cover rounded-sm opacity-80"
                style={{ boxShadow: '1px 1px 4px rgba(0,0,0,0.25)' }}
              />
            </div>
          ))}
        </div>

        {/* Crab rave */}
        <CrabRave />

        {/* Hungry fish */}
        <HungryFish />

        {/* Fishbowl */}
        <img
          src="./assets/fishbowl.png"
          alt="confession jar"
          className="relative z-10"
          style={{ width: 220, objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.18))' }}
          draggable={false}
        />

        {/* Drop animation */}
        <AnimatePresence>
          {justDropped && (
            <motion.div
              initial={{ y: -60, opacity: 1, scale: 1 }}
              animate={{ y: 20, opacity: 0, scale: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeIn' }}
              className="absolute z-20 top-0"
              style={{ pointerEvents: 'none' }}
            >
              <div className="w-10 h-10 rounded-sm overflow-hidden shadow-md">
                <img src={STICKY_IMGS[dbNotes[dbNotes.length - 1]?.bg ?? 'sticky1']} className="w-full h-full object-cover" alt="" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={pullNote}
          className="skill-badge hover:shadow-[3px_3px_0_#5BC8E8] transition-shadow text-sm"
        >
          pull one out
        </button>
        <button
          onClick={() => setWriting(true)}
          className="skill-badge hover:shadow-[3px_3px_0_#4D7C5A] transition-shadow text-sm"
        >
          + leave a note
        </button>
      </div>

      {/* Note viewer modal */}
      <AnimatePresence>
        {viewIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
            onClick={() => setViewIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotate: 6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="flex flex-col items-center gap-5"
              onClick={e => e.stopPropagation()}
            >
              <StickyNote note={allNotes[viewIdx]} rotation={-1 + Math.sin(viewIdx) * 3} />

              {/* Nav */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevNote}
                  className="w-9 h-9 border-2 border-white/60 rounded-full text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  ←
                </button>
                <span className="mono text-xs text-white/70">
                  {viewIdx + 1} / {allNotes.length}
                </span>
                <button
                  onClick={nextNote}
                  className="w-9 h-9 border-2 border-white/60 rounded-full text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  →
                </button>
              </div>

              <button
                onClick={() => setViewIdx(null)}
                className="mono text-xs text-white/50 hover:text-white/80 transition-colors"
              >
                put it back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Write modal */}
      <AnimatePresence>
        {writing && (
          <WriteNoteModal
            onSubmit={addNote}
            onClose={() => setWriting(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

import { useState, useEffect, type CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bcazwcpvglbmvmbdtcze.supabase.co',
  'sb_publishable_ytnohFpZD6BX_ocHKfp0GA_rk3TPjO5',
)

type Note = { id: string; name: string; subject: string; text: string }

/* ── General note icon — the rose-gold camera peeking out of the fishbowl ── */
const NOTE_ICON = './assets/note-icon.png'

/* ── Floating charm accents around the pager screen ── */
const CHARM_IMAGES = [
  './assets/charms/notes-heart.png',
  './assets/charms/flower-1.png',
  './assets/charms/flower-2.png',
  './assets/charms/vine-1.png',
  './assets/charms/vine-2.png',
  './assets/charms/border-arch.png',
]

const CHARM_SLOTS = [
  { className: 'absolute -top-4 -left-7', rotate: -14, width: 32, delay: 0 },
  { className: 'absolute -top-6 -right-6', rotate: 10, width: 30, delay: 0.3 },
  { className: 'absolute -bottom-8 left-1/2 -translate-x-1/2', rotate: -6, width: 26, delay: 0.6 },
]

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function PagerCharms() {
  const [charms] = useState(() => shuffled(CHARM_IMAGES))

  return (
    <>
      {CHARM_SLOTS.map((slot, i) => (
        <motion.img
          key={i}
          src={charms[i]}
          alt=""
          draggable={false}
          className={`${slot.className} pointer-events-none select-none`}
          style={{ width: slot.width, transform: `rotate(${slot.rotate}deg)` }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: slot.delay }}
        />
      ))}
    </>
  )
}

/* ── Retro "Mail" compose window ── */
function MailComposeModal({
  onSubmit,
  onClose,
}: {
  onSubmit: (name: string, subject: string, text: string) => void
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [text, setText] = useState('')
  const maxLen = 200

  function send() {
    const trimmed = text.trim()
    if (!trimmed) return
    onSubmit(name.trim() || 'anonymous', subject.trim() || '(no subject)', trimmed)
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
        className="retro-window max-w-sm w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="retro-titlebar">Mail</div>
        <div className="retro-menubar">
          <span><u>D</u>isc</span>
          <span><u>V</u>iew</span>
          <span><u>O</u>ptions</span>
          <span><u>H</u>elp</span>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <label className="mono text-xs w-16 flex-shrink-0">Name:</label>
            <input
              value={name}
              onChange={e => setName(e.target.value.slice(0, 40))}
              placeholder="anonymous"
              className="retro-sunken flex-1 px-2 py-1 text-sm outline-none"
              style={{ fontFamily: "'Space Mono', monospace" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="mono text-xs w-16 flex-shrink-0">Subject:</label>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value.slice(0, 60))}
              placeholder="no subject"
              className="retro-sunken flex-1 px-2 py-1 text-sm outline-none"
              style={{ fontFamily: "'Space Mono', monospace" }}
            />
          </div>

          <textarea
            autoFocus
            value={text}
            onChange={e => setText(e.target.value.slice(0, maxLen))}
            placeholder="type your message..."
            rows={5}
            className="retro-sunken w-full px-2 py-2 text-sm outline-none resize-none"
            style={{ fontFamily: "'Space Mono', monospace" }}
          />

          <div className="flex items-center justify-between gap-3">
            <span className="mono text-xs text-muted">{text.length}/{maxLen}</span>
            <div className="flex gap-2">
              <button
                onClick={send}
                disabled={!text.trim()}
                className="retro-raised px-4 py-1.5 mono text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send
              </button>
              <button onClick={onClose} className="retro-raised px-4 py-1.5 mono text-xs font-bold">
                Delete
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Message camera — the note content lives inside the cleared-out LCD screen ── */
const CAMERA_FRAME_W = 210
const CAMERA_FRAME_H = CAMERA_FRAME_W * (1280 / 720)
// Screen hole as a fraction of the full frame image, measured from the source photo
const SCREEN_RECT = { left: '10%', top: '10.3125%', width: '76.667%', height: '55.547%' }

const cameraNavBtnStyle: CSSProperties = {
  width: 24,
  height: 24,
  borderRadius: 9999,
  border: '1.5px solid rgba(255,255,255,0.6)',
  color: '#fff',
  background: 'rgba(255,255,255,0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.75rem',
}

function MessageCamera({
  notes,
  startIdx,
  startRevealed,
  onClose,
}: {
  notes: Note[]
  startIdx: number
  startRevealed: boolean
  onClose: () => void
}) {
  const [idx, setIdx] = useState(startIdx)
  const [revealed, setRevealed] = useState(startRevealed)

  const note = notes[idx]

  function next() { setIdx(i => (i + 1) % notes.length) }
  function prev() { setIdx(i => (i - 1 + notes.length) % notes.length) }

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
        initial={{ scale: 0.8, rotate: -4, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.8, rotate: 4, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="flex flex-col items-center gap-4"
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: 'relative', width: CAMERA_FRAME_W, height: CAMERA_FRAME_H }}>
          <PagerCharms />

          {/* Note content, sitting behind the frame's cleared-out screen hole */}
          <div
            style={{
              position: 'absolute',
              ...SCREEN_RECT,
              zIndex: 1,
              borderRadius: 14,
              overflow: 'hidden',
              background: 'linear-gradient(160deg, #0d1b2a, #1b2f47)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '10px 12px',
              gap: 6,
            }}
          >
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="flex flex-col items-center gap-2"
                aria-label="Open messages"
              >
                <svg width="28" height="21" viewBox="0 0 34 26" fill="none">
                  <rect x="1" y="1" width="32" height="24" rx="2" stroke="#fff" strokeWidth="2" fill="none" />
                  <path d="M2 2 L17 15 L32 2" stroke="#fff" strokeWidth="2" fill="none" />
                </svg>
                <p className="mono text-[0.6rem] font-bold lowercase" style={{ color: '#fff' }}>
                  you have {notes.length} message{notes.length !== 1 ? 's' : ''}
                </p>
              </button>
            ) : (
              <>
                <p className="mono text-[0.5rem]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {idx + 1} / {notes.length}
                </p>
                <p className="font-display font-bold text-xs lowercase" style={{ color: '#fff' }}>
                  {note.name}
                </p>
                <p className="mono text-[0.5rem] italic lowercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {note.subject}
                </p>
                <p className="font-body text-[0.65rem] leading-snug" style={{ color: '#e8f0f8' }}>
                  {note.text}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <button onClick={prev} style={cameraNavBtnStyle} aria-label="Previous message">&larr;</button>
                  <button
                    onClick={() => setRevealed(false)}
                    className="mono"
                    style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.5)' }}
                  >
                    cover
                  </button>
                  <button onClick={next} style={cameraNavBtnStyle} aria-label="Next message">&rarr;</button>
                </div>
              </>
            )}
          </div>

          {/* Camera frame overlay — transparent hole reveals the screen content behind it */}
          <img
            src="./assets/camera-frame.png"
            alt=""
            draggable={false}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}
          />
        </div>

        <button
          onClick={onClose}
          className="mono text-xs text-white/70 hover:text-white transition-colors"
        >
          put it back
        </button>
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

/* ── Main component ──
   postSlug: when set, this jar is scoped to one blog post's notes only.
   When omitted, it shows/writes the general (post_slug is null) notes. ── */
export default function ConfessionJar({ postSlug }: { postSlug?: string } = {}) {
  const [allNotes, setAllNotes] = useState<Note[]>([])

  const [pagerOpen, setPagerOpen] = useState(false)
  const [pagerStartIdx, setPagerStartIdx] = useState(0)
  const [pagerStartRevealed, setPagerStartRevealed] = useState(false)
  const [writing, setWriting] = useState(false)
  const [justDropped, setJustDropped] = useState(false)

  useEffect(() => {
    let query = supabase
      .from('confession_notes')
      .select('id, name, subject, text')
      .order('created_at', { ascending: true })

    query = postSlug ? query.eq('post_slug', postSlug) : query.is('post_slug', null)

    query.then(({ data, error }) => {
      if (error) console.error('confession_notes query failed (has the post_slug migration been run?):', error)
      if (data) {
        setAllNotes(data.map(n => ({
          ...n,
          name: n.name || 'anonymous',
          subject: n.subject || '(no subject)',
        })))
      }
    })
  }, [postSlug])

  function openPagerFromStack() {
    if (allNotes.length === 0) return
    setPagerStartIdx(0)
    setPagerStartRevealed(false)
    setPagerOpen(true)
  }

  function pullNote() {
    if (allNotes.length === 0) return
    setPagerStartIdx(Math.floor(Math.random() * allNotes.length))
    setPagerStartRevealed(true)
    setPagerOpen(true)
  }

  async function addNote(name: string, subject: string, text: string) {
    const { data } = await supabase
      .from('confession_notes')
      .insert({ name, subject, text, post_slug: postSlug ?? null })
      .select('id, name, subject, text')
      .single()
    if (data) setAllNotes(prev => [...prev, data])
    setJustDropped(true)
    setTimeout(() => setJustDropped(false), 2200)
  }

  return (
    <div className="mt-12 flex flex-col items-center gap-6">

      {/* Title */}
      <div className="text-center">
        <h3 className="font-display font-bold text-lg lowercase">
          {postSlug ? 'notes on this post' : 'the message jar'}
        </h3>
        <p className="mono text-xs text-muted mt-1">
          {allNotes.length} note{allNotes.length !== 1 ? 's' : ''} inside
        </p>
      </div>

      {/* Bowl + peeking notes */}
      <div className="relative flex flex-col items-center" style={{ width: 280 }}>

        {/* Camera peeking from bowl — click to open the pager */}
        <button
          onClick={openPagerFromStack}
          aria-label="Read messages"
          className="absolute"
          style={{
            width: 110,
            height: 110,
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%) rotate(-6deg)',
            zIndex: 1,
          }}
        >
          <img
            src={NOTE_ICON}
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))' }}
            draggable={false}
          />
        </button>

        {/* Crab rave */}
        <CrabRave />

        {/* Hungry fish */}
        <HungryFish />

        {/* Fishbowl */}
        <img
          src="./assets/fishbowl.png"
          alt="message jar"
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
              style={{ pointerEvents: 'none', width: 40, height: 40 }}
            >
              <img src={NOTE_ICON} alt="" className="w-full h-full object-contain" draggable={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={pullNote}
          disabled={allNotes.length === 0}
          className="skill-badge hover:shadow-[3px_3px_0_#5BC8E8] transition-shadow text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
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

      {/* Message camera */}
      <AnimatePresence>
        {pagerOpen && (
          <MessageCamera
            notes={allNotes}
            startIdx={pagerStartIdx}
            startRevealed={pagerStartRevealed}
            onClose={() => setPagerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mail compose window */}
      <AnimatePresence>
        {writing && (
          <MailComposeModal
            onSubmit={addNote}
            onClose={() => setWriting(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

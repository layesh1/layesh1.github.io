import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Skills — actual brand colors ── */
const skills = [
  { label: 'Python',          color: '#3776AB', logo: './assets/logos/python.svg',         short: 'Py'  },
  { label: 'R',               color: '#276DC3', logo: './assets/logos/r.svg',              short: 'R'   },
  { label: 'SQL',             color: '#CC2927', logo: null,                                short: 'SQL' },
  { label: 'Stata',           color: '#1A3A5C', logo: null,                                short: 'St'  },
  { label: 'SAS',             color: '#0070C0', logo: null,                                short: 'SAS' },
  { label: 'KNIME',           color: '#C8A000', logo: './assets/logos/knime.svg',          short: 'KN'  },
  { label: 'Java',            color: '#ED8B00', logo: './assets/logos/java.svg',           short: 'Jv'  },
  { label: 'Excel',           color: '#217346', logo: './assets/logos/microsoftexcel.svg', short: 'XL'  },
  { label: 'Figma',           color: '#F24E1E', logo: './assets/logos/figma.svg',          short: 'Fig' },
  { label: 'Vercel',          color: '#1A1A1A', logo: './assets/logos/vercel.svg',         short: '▲'   },
  { label: 'DaVinci Resolve', color: '#233A51', logo: './assets/logos/davinciresolve.svg', short: 'DV'  },
  { label: 'React/JS',        color: '#087EA4', logo: './assets/logos/react.svg',          short: 'Re'  },
]

/* Badge positions on a circular pie — equally spaced */
function getPiePositions(n: number, rPct: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i * 360 / n - 90) * Math.PI / 180
    return { x: 50 + rPct * Math.cos(a), y: 50 + rPct * Math.sin(a) }
  })
}

function SkillPieChart() {
  const positions = getPiePositions(skills.length, 35)  // 36% → sits on the lattice crust ring

  return (
    <div className="flex flex-col items-center gap-4 w-full">

      {/* ── Pie visual ── */}
      <div className="relative mx-auto" style={{ width: 264, height: 264, transform: 'translate(-60px, 0px)' }}>

        {/* Real pie illustration */}
        {/* ↓ To move just the pie image: change the numbers in translate(Xpx, Ypx) */}
        <img
          src="./assets/pie-transparent.png"
          alt="pie chart"
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: 'contain',
            filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.22))',
            transform: 'translate(0px, 0px)',
          }}
        />

        {/* Skill badges on top of the pie — HTML img for reliable loading */}
        {skills.map((s, i) => (
          <div
            key={s.label}
            title={s.label}
            className="absolute group"
            style={{
              left:  `calc(${positions[i].x}% - 18px)`,
              top:   `calc(${positions[i].y}% - 18px)`,
            }}
          >
            {/* Badge circle */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform duration-150 group-hover:scale-110 cursor-default"
              style={{
                backgroundColor: s.color,
                border: '2px solid rgba(255,255,255,0.55)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
              }}
            >
              {s.logo ? (
                <img
                  src={s.logo}
                  alt={s.label}
                  width={20} height={20}
                  className="object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                  onError={e => {
                    const img = e.currentTarget
                    img.style.display = 'none'
                    const span = img.nextElementSibling as HTMLElement | null
                    if (span) span.style.display = 'block'
                  }}
                />
              ) : null}
              <span
                className="text-white font-mono font-bold leading-none"
                style={{
                  fontSize: s.short.length > 2 ? '7px' : '9px',
                  display: s.logo ? 'none' : 'block',
                }}
              >{s.short}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend — 2 columns, full names, tooltip on hover */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 w-full">
        {skills.map((s, i) => (
          <div key={i} title={s.label} className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: s.color }} />
            <span className="mono text-[9px] text-dark leading-none">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MultilingualGreeting() {
  const [idx, setIdx] = useState(0)
  const greetings = [
    'ہیلو، دنیا',
    'Салом, Дунё',
    'سلام دنیا',
    'مرحباً يا عالم',
    'hello, world',
  ]

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % greetings.length), 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mb-2 h-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="text-muted"
          style={{ fontFamily: "'Amiri', 'Lora', Georgia, serif", fontSize: '1.5rem', lineHeight: 1.3 }}
        >
          {greetings[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

function DraggableLaceCard() {
  return (
    <motion.div
      style={{ overflow: 'visible', position: 'relative', width: '100%', transform: 'translate(143.29px, 84.19px)' }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.24, duration: 0.5, ease: 'easeOut' }}
    >
      {/* Lace frame */}
      <img
        src="./assets/lace-frame-transparent.png"
        className="absolute pointer-events-none"
        style={{
          top: '-52px',
          left: '-68px',
          width: 'calc(100% + 136px)',
          height: 'calc(100% + 90px)',
          objectFit: 'fill',
          zIndex: 0,
        }}
      />
      {/* Content */}
      <div className="relative z-10 px-8 pt-14 pb-8 flex flex-col items-center">
        <div className="w-full mb-4">
          <h2 className="font-display font-bold text-xl mb-0.5 lowercase">
            what's on the menu?
          </h2>
          <p className="mono text-muted text-xs">skills & tools — evenly served</p>
        </div>
        <SkillPieChart />
        <DraggableBonAppetit />
      </div>
    </motion.div>
  )
}

const STAT_POSITIONS: Record<string, { x: number; y: number }> = {
  'majors':           { x: -575.06, y: -78.84 },
  'experiences':      { x: -575.85, y: -76.63 },
  'research projects':{ x: -575.42, y: -76.41 },
}

function DraggableStat({ num, label }: { num: string; label: string }) {
  const pos = STAT_POSITIONS[label] ?? { x: 0, y: 0 }
  return (
    <div
      className="card text-center py-4 select-none"
      style={{ position: 'relative', transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      <div className="font-display font-bold text-3xl text-purple">{num}</div>
      <div className="mono text-muted mt-1 text-xs">{label}</div>
    </div>
  )
}

function DraggableBonAppetit() {
  return (
    <p
      className="font-display font-semibold text-sm text-muted italic select-none"
      style={{ position: 'relative', alignSelf: 'flex-end', marginTop: '1rem', transform: 'translate(-255px, -140px)' }}
    >
      bon appétit!
    </p>
  )
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Home() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-[68px] bg-gingham overflow-hidden"
    >
      {/* Decorative clovers */}
      <Clover className="absolute top-16 left-4 opacity-20 w-20 h-20 text-green" />
      <Clover className="absolute bottom-24 left-12 opacity-15 w-28 h-28 text-green rotate-45" />
      <Clover className="absolute top-32 right-8 opacity-15 w-16 h-16 text-green -rotate-12" />
      <Snowflake className="absolute top-48 left-1/4 opacity-20 w-8 h-8 text-green" />
      <Snowflake className="absolute top-64 right-1/3 opacity-20 w-6 h-6 text-green" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-start">

        {/* ── Left: photo + bio ── */}
        <div className="flex flex-col gap-6">

          {/* Photo frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-xs mx-auto"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 tape-blue rounded-sm rotate-[-2deg] z-10" />
            <div className="absolute -top-3 left-1/4 w-12 h-5 tape-green rounded-sm rotate-[3deg] z-10" />
            <div
              className="border-4 border-border bg-parchment rounded-sm overflow-hidden shadow-[6px_6px_0_#2D2D2D]"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src="./assets/lena.jpg"
                alt="Lena Ayesh"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="bg-white/80 border-2 border-border rounded-sm p-5 shadow-[3px_3px_0_#2D2D2D]"
          >
            <p className="font-body text-base leading-relaxed text-dark">
              I'm a senior at UNC Charlotte graduating May 2026, triple-majoring in{' '}
              <span className="font-semibold underline decoration-dotted underline-offset-2">
                Data Science, Political Science, and International Studies
              </span>{' '}
              (Go Niners!).
            </p>
            <p className="font-body text-base leading-relaxed text-dark mt-3">
              My interests live at the intersection of data and policy — especially
              in national security and human rights. I co-founded UNC Charlotte's
              Security & Intelligence Student Organization, and studying Urdu and
              Farsi has completely reshaped how I think about open-source research.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="https://www.linkedin.com/in/lena-ayesh/"
                target="_blank" rel="noopener noreferrer"
                className="skill-badge hover:shadow-[3px_3px_0_#8B5CF6] transition-shadow"
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a
                href="https://github.com/layesh1"
                target="_blank" rel="noopener noreferrer"
                className="skill-badge hover:shadow-[3px_3px_0_#8B5CF6] transition-shadow"
              >
                <GithubIcon /> GitHub
              </a>
              <a href="mailto:layesh1@charlotte.edu"
                className="skill-badge hover:shadow-[3px_3px_0_#8B5CF6] transition-shadow"
              >
                ✉ Email
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Right: name + skills ── */}
        <div className="flex flex-col gap-8">

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MultilingualGreeting />
            <h1 className="section-title text-dark">
              hi, i'm<br />
              <span className="text-green">lena!</span>
            </h1>
            <div className="mt-1 h-1 w-48 bg-green rounded-full" />
          </motion.div>

          {/* ── Skills card — lace IS the card background ── */}
          <DraggableLaceCard />

          {/* Quick stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { num: '3',   label: 'majors' },
              { num: '8+',  label: 'experiences' },
              { num: '4+',  label: 'research projects' },
            ].map(stat => (
              <DraggableStat key={stat.label} num={stat.num} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted"
      >
        <span className="mono text-xs">scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </section>
  )
}

function Clover({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="30" r="18" /><circle cx="70" cy="55" r="18" />
      <circle cx="30" cy="55" r="18" /><circle cx="50" cy="75" r="18" />
      <rect x="47" y="70" width="6" height="20" rx="3" />
    </svg>
  )
}
function Snowflake({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
      <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /><line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )
}

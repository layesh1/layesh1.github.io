import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type TimelineEntry = {
  period: string
  periodColor: 'blue' | 'purple' | 'rose' | 'green'
  title: string
  org?: string
  location: string
  bullets: string[]
  link?: { label: string; href: string }
  logo?: string // future: path to org logo
}

const entries: TimelineEntry[] = [
  {
    period: "spring '22",
    periodColor: 'blue',
    title: 'National Security Seminar',
    org: 'The Washington Institute',
    location: 'Washington, D.C.',
    bullets: [
      'Received a full scholarship to attend a week-long intensive seminar on national security threats alongside senior IC practitioners, agency officials, and policy leaders.',
      'Toured ODNI, DHS, and USDT headquarters; received operational briefings on interagency intelligence coordination.',
    ],
    link: { label: 'learn more', href: 'https://twc.edu/programs/national-security-seminar' },
  },
  {
    period: '2022\u201323',
    periodColor: 'purple',
    title: 'Big Data & Internet of Vehicles Intern',
    org: 'Office of the Director of National Intelligence',
    location: 'Virtual',
    bullets: [
      'Conducted structured analysis comparing private-sector and government OSINT architectures across legal authorities, collection methods, and operational constraints.',
      'Designed a full OSINT organization focused on satellite imagery collection \u2014 including a detailed budget, geopolitical risk assessment, and operational business plan.',
    ],
    link: { label: 'letter of recommendation', href: './assets/odni-recommendation.pdf' },
  },
  {
    period: "summer '23",
    periodColor: 'blue',
    title: 'Western Europe Study Abroad',
    org: 'IC Centers for Academic Excellence',
    location: 'France & U.K.',
    bullets: [
      'Awarded a fully funded scholarship to study Allied intelligence operations in France and the UK on-site, tracing how technology shaped collection, deception, and codebreaking strategy.',
      'Engaged with NATO diplomats and policy analysts on contemporary alliance intelligence-sharing and collective security challenges.',
    ],
  },
  {
    period: 'fall 2023',
    periodColor: 'purple',
    title: 'Intern \u2014 Bureau of Intelligence & Research',
    org: 'U.S. Department of State',
    location: 'Washington, D.C.',
    bullets: [
      'Produced 10+ foreign policy analyses used to brief senior leadership, including former Secretary Kerry.',
      'Reviewed and synthesized classified and declassified State Department cable traffic to surface historical patterns relevant to active policy priorities.',
      'Built and cleaned a dataset of 1,000+ rows of diplomatic data for integration into policy assessments.',
    ],
  },
  {
    period: "summer '24",
    periodColor: 'green',
    title: 'N.C. Marian Drane Graham Scholar + Critical Language Scholar',
    location: 'Raleigh, N.C. & Lucknow, India',
    bullets: [
      'Selected as N.C. Marian Drane Graham Scholar; met with UNC system leadership, campus leaders across N.C., and elected officials in Washington, D.C.',
      'Researched and wrote a policy brief on AI applications in N.C. prison education systems, analyzing outcome data and equity implications.',
      'Received the Critical Language Scholarship for Urdu; served as a U.S. student diplomat in Lucknow, India, conducting immersive cultural and diplomatic engagement.',
    ],
  },
  {
    period: 'fall 2024',
    periodColor: 'purple',
    title: 'Immigration Policy Preceptor',
    org: 'UNC Charlotte',
    location: 'Charlotte, N.C.',
    bullets: [
      'Supported 100+ undergraduate students through tutoring, grading, and substantive policy feedback for a university-level immigration policy course.',
    ],
  },
  {
    period: '2024\u201325',
    periodColor: 'rose',
    title: 'Intelligence Analysis & Ethical AI Consumption',
    org: 'CENTCOM',
    location: 'Virtual',
    bullets: [
      'Developed a practical framework for intelligence analysts on responsible AI model training \u2014 addressing data sourcing, bias identification, and national security risk mitigation.',
    ],
  },
  {
    period: "spring '25",
    periodColor: 'blue',
    title: 'Undergraduate Research Scholar',
    org: 'UNC Charlotte',
    location: 'Charlotte, N.C.',
    bullets: [
      'Conducted IRB-approved, faculty-led research examining Palestinian-American perspectives on U.S. foreign and domestic policy.',
      'Completed 20+ in-depth interviews and produced a full-length documentary film using DaVinci Resolve.',
    ],
  },
]

const colorMap = {
  blue:   { text: 'text-blue-600',   bg: 'bg-[#5BC8E8]',   border: 'border-[#5BC8E8]' },
  purple: { text: 'text-purple-600', bg: 'bg-[#8B5CF6]',   border: 'border-[#8B5CF6]' },
  rose:   { text: 'text-rose-600',   bg: 'bg-[#C9605A]',   border: 'border-[#C9605A]' },
  green:  { text: 'text-green-700',  bg: 'bg-[#4D7C5A]',   border: 'border-[#4D7C5A]' },
}

function TimelineCard({
  entry,
  side,
  index,
}: {
  entry: TimelineEntry
  side: 'left' | 'right'
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const colors = colorMap[entry.periodColor]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04, ease: 'easeOut' }}
      className={`relative md:w-[calc(50%-2rem)] ${
        side === 'right' ? 'md:ml-auto' : ''
      }`}
    >
      {/* Connector dot on timeline */}
      <div
        className={`hidden md:block absolute top-6 ${
          side === 'left' ? 'right-[-2.1rem]' : 'left-[-2.1rem]'
        } w-4 h-4 rounded-full border-2 border-border z-10 ${colors.bg}`}
      />

      <div className="card relative">
        {/* Period badge */}
        <span
          className={`mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${colors.border} ${colors.text} inline-block mb-3`}
          style={{ background: 'white' }}
        >
          {entry.period}
        </span>

        <h3 className="font-display font-bold text-lg leading-tight">{entry.title}</h3>
        {entry.org && (
          <p className="font-body italic text-muted text-sm mt-0.5">{entry.org}</p>
        )}
        <p className="mono text-xs text-muted mt-1 mb-4">📍 {entry.location}</p>

        <ul className="space-y-2">
          {entry.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm font-body text-dark leading-relaxed">
              <span className="text-muted mt-1 flex-shrink-0">·</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {entry.link && (
          <a
            href={entry.link.href}
            onClick={entry.link.href === '#' ? (e) => e.preventDefault() : undefined}
            className="underline-link mono text-xs mt-4 inline-block"
          >
            {entry.link.label} →
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="experience" className="relative py-24 overflow-hidden" style={{ background: '#EDE0C8' }}>
      {/* Parchment texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(180,160,120,0.3) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(160,140,100,0.2) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="mono text-muted text-xs mb-2 tracking-widest">work & study</p>
          <h2 className="section-title">experience<br />timeline</h2>
          <div className="mt-3 h-1 w-20 bg-border rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — desktop */}
          <div className="hidden md:block timeline-line" />
          {/* Left line — mobile */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="flex flex-col gap-10 md:gap-14">
            {entries.map((entry, i) => (
              <TimelineCard
                key={i}
                entry={entry}
                side={i % 2 === 0 ? 'left' : 'right'}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

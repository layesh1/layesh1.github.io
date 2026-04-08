import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useExitLink } from './ExitModal'

const awards = [
  { label: 'Robert G. Fowler Scholarship Recipient', href: undefined },
  { label: 'Virtual Student Federal Service Award', href: undefined },
  { label: 'Intelligence Center for Academic Excellence Scholar', href: undefined },
  { label: 'IC CAE "Crisis in North Korea" Winner', href: undefined },
  { label: 'IC CAE "Crisis in the Baltic Sea" Participant', href: undefined },
  { label: 'Latvia Delegate — Model UN, Carolina\'s Conference', href: undefined },
  { label: 'President & Co-Founder — Security & Intelligence Student Organization (2024–25)', href: undefined },
  { label: 'President (2022–23) & Treasurer (2021–22) — Palestinian Cultural Organization', href: undefined },
]

const featured = [
  {
    type: 'Press',
    headline: 'Investing in the Future of the IC Workforce — Undergraduate',
    org: 'Intelligence and National Security Alliance (INSA)',
    excerpt:
      'Lena Ayesh, a junior majoring in Intelligence Analysis at UNC Charlotte, has successfully blended technical expertise with a strong passion for policy. Featured for her work at the State Dept Bureau of Intelligence & Research, ODNI, CENTCOM, and as a Critical Language Scholarship recipient.',
    href: 'https://www.insaonline.org/detail-pages/news/2024/08/22/2024-insf-scholarship-recipients',
  },
  {
    type: '2× Scholarship',
    headline: 'Critical Language Scholarship Recipient',
    org: 'U.S. Dept of State, Bureau of Educational & Cultural Affairs',
    excerpt:
      'One of the most selective U.S. government language programs — fewer than 1% of applicants are chosen nationally each year. Selected twice: Urdu 2024 (Lucknow, India) and Farsi 2025. Fully funded by the State Department, including tuition, housing, meals, and international travel.',
    href: 'https://credentials.clscholarship.org/aa831498-aa7b-447c-a240-a5068249f57e#acc.PaYBpxsw',
  },
  {
    type: 'Feature',
    headline: 'Overcoming Anxiety and Achieving Excellence',
    org: 'UNC Charlotte — by Deonna Dickens, Apr 8 2025',
    excerpt:
      'Lena Ayesh balances three majors, internships, and personal growth — a featured student spotlight on resilience and ambition.',
    href: 'https://www.ninertimes.com/news/overcoming-anxiety-and-achieving-excellence-lena-ayesh-balances-three-majors-internships-and-personal-growth/article_738c8b9e-5c72-4a1e-9107-504b88401145.html',
  },
]

function FeaturedCard({ item, index }: { item: typeof featured[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const { openExit } = useExitLink()

  const isExternal = item.href.startsWith('http')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      onClick={() => isExternal ? openExit(item.href) : undefined}
      className={`card block group hover:shadow-[6px_6px_0_#4D7C5A] transition-shadow duration-200 no-underline ${isExternal ? 'cursor-pointer' : ''}`}
    >
      <span className="mono text-xs text-green font-bold uppercase tracking-widest block mb-2">
        {item.type}
      </span>
      <h3 className="font-display font-bold text-base leading-snug mb-1 group-hover:text-purple transition-colors">
        {item.headline}
      </h3>
      <p className="font-body italic text-xs text-muted mb-3">{item.org}</p>
      <p className="font-body text-sm text-dark leading-relaxed mb-3">{item.excerpt}</p>
      {isExternal && (
        <span className="underline-link mono text-xs">read here →</span>
      )}
    </motion.div>
  )
}

export default function Achievements() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section
      id="achievements"
      className="relative py-24 overflow-hidden bg-gingham"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="mono text-muted text-xs mb-2 tracking-widest">honors & recognition</p>
          <h2 className="section-title">achievements</h2>
          <div className="mt-3 h-1 w-20 bg-border rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">

          {/* ── Left: Awards list ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="card relative">
              {/* Tape */}
              <div className="absolute -top-3 left-10 w-16 h-5 tape-green rounded-sm rotate-[-1deg]" />
              <h3 className="font-display font-bold text-lg mb-5 lowercase">awards & roles</h3>
              <ul className="space-y-3">
                {awards.map((a, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="flex items-start gap-3 text-sm font-body"
                  >
                    <span className="text-green mt-1.5 flex-shrink-0">★</span>
                    {a.href ? (
                      <a
                        href={a.href}
                        onClick={a.href === '#' ? (e) => e.preventDefault() : undefined}
                        className="underline-link"
                      >
                        {a.label}
                      </a>
                    ) : (
                      <span className="text-dark">{a.label}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Org logos placeholder */}
            <div className="mt-5 flex gap-3 flex-wrap">
              {['ODNI', 'INSA', 'Dept of State', 'CENTCOM'].map(org => (
                <div
                  key={org}
                  className="card py-2 px-3 text-xs mono text-muted"
                  title={`${org} logo — add to public/assets/`}
                >
                  {org}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Featured cards ── */}
          <div className="flex flex-col gap-5">
            {featured.map((item, i) => (
              <FeaturedCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

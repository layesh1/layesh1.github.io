import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useExitLink } from './ExitModal'

type Project = {
  id: string
  title: string
  description: string
  fullDescription?: string
  advisor?: string
  status?: 'in-progress' | 'complete'
  pdf?: string
  repo?: string
  website?: string
  tags?: string[]
}

const projects: Project[] = [
  {
    id: 'human-rights',
    title: 'International Human Rights Abuse Analyst',
    description:
      'Year-long, faculty-led research coding human rights abuses across 10+ scales from 1993–2022. Findings used to inform federal policymakers at ODNI.',
    fullDescription:
      'Conducted year-long, faculty-led research on international human rights abuses — systematically coding incidents across 10+ scales from 1993 to 2022 using Department of State reports, Amnesty International data, and open-source sources. Findings were used to support ODNI federal policymakers in assessing diplomatic and policy responses to human rights conditions globally.',
    advisor:
      'Advised by James Walsh, Program Director for the Security & Preparedness Program at the National Science Foundation; Professor of Political Science, Data Science, and Public Policy.',
    tags: ['Policy Research', 'Data Coding', 'OSINT'],
    pdf: './assets/rhrv-paper.pdf',
  },
  {
    id: 'war-on-drugs',
    title: 'The War on Drugs and Intelligence Reform: A Mixed Ethics Approach',
    description:
      'International Studies thesis examining how a failure of ethical intelligence collection led to systemic policy failures in the War on Drugs and War on Terror.',
    fullDescription:
      'International Studies thesis examining how a lack of ethical intelligence collection contributed to systemic failures in U.S. drug and counterterrorism policy. Employed a mixed-methods approach: quantitative survey analysis and open-source data aggregation to build an empirical argument for intelligence reform grounded in ethical frameworks.',
    advisor:
      "Advised by Dr. Charles Houck, Program Director of UNC Charlotte's International Studies Program.",
    tags: ['Intelligence Studies', 'Ethics', 'Mixed Methods'],
    pdf: './assets/war-on-drugs.pdf',
  },
  {
    id: 'minutes-matter',
    title: 'MinutesMatter — Agentic Wildfire Evacuation Platform',
    description:
      'WiDS Datathon @ UNC Charlotte. Analyzed 62,696 wildfire incidents and found 73.5% issued no formal alert. Built an agentic AI pipeline, web dashboard, and iOS prototype for real-time evacuation guidance.',
    fullDescription:
      'WiDS Datathon project at UNC Charlotte analyzing 62,696 USFS wildfire incidents from 1992–2020. Discovered that 73.5% of fires issued no formal evacuation alert, and communities with higher social vulnerability faced a 3.4× gap in formal evacuation orders. Built Flameo, a multi-agent AI pipeline, alongside a React/Vercel web dashboard and iOS prototype to deliver real-time, equity-informed evacuation guidance. Incorporated Random Forest classification (AUC 0.89) for fire behavior prediction.',
    tags: ['Python', 'React', 'Machine Learning', 'AI Agents', 'Public Safety'],
    repo: 'https://github.com/layesh1/wildfire-app',
    website: 'https://www.minutesmatterapp.org/',
    pdf: './assets/minutes-matter.pdf',
  },
]

function Hibiscus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="currentColor">
      <ellipse cx="40" cy="20" rx="12" ry="18" transform="rotate(0 40 40)" />
      <ellipse cx="40" cy="20" rx="12" ry="18" transform="rotate(72 40 40)" />
      <ellipse cx="40" cy="20" rx="12" ry="18" transform="rotate(144 40 40)" />
      <ellipse cx="40" cy="20" rx="12" ry="18" transform="rotate(216 40 40)" />
      <ellipse cx="40" cy="20" rx="12" ry="18" transform="rotate(288 40 40)" />
      <circle cx="40" cy="40" r="10" fill="white" />
      <circle cx="40" cy="40" r="5" />
    </svg>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { openExit } = useExitLink()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-parchment border-2 border-border rounded-sm shadow-[8px_8px_0_#2D2D2D] max-w-2xl w-full max-h-[88vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start gap-4 mb-4">
            <h2 className="font-display font-bold text-xl leading-snug flex-1">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-border rounded-sm hover:bg-border/30 transition-colors font-mono font-bold text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Tags */}
          {project.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="mono text-xs px-2 py-0.5 bg-green/10 border border-green/30 text-green-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Status */}
          {project.status === 'in-progress' && (
            <span className="mono text-xs px-2 py-0.5 bg-rose-50 border border-rose-300 text-rose-700 rounded-full inline-block mb-4">
              in progress
            </span>
          )}

          {/* Full description */}
          <p className="font-body text-sm text-dark leading-relaxed mb-4">
            {project.fullDescription ?? project.description}
          </p>

          {/* Advisor */}
          {project.advisor && (
            <p className="font-body italic text-xs text-muted border-t border-border/30 pt-3 mb-4">
              {project.advisor}
            </p>
          )}

          {/* Action links */}
          {(project.repo || project.pdf || project.website) && (
            <div className="flex flex-wrap gap-3 mb-5">
              {project.website && (
                <button
                  onClick={() => openExit(project.website!)}
                  className="skill-badge hover:shadow-[3px_3px_0_#5BC8E8] transition-shadow text-xs"
                >
                  visit website ↗
                </button>
              )}
              {project.repo && (
                <button
                  onClick={() => openExit(project.repo!)}
                  className="skill-badge hover:shadow-[3px_3px_0_#4D7C5A] transition-shadow text-xs"
                >
                  GitHub ↗
                </button>
              )}
              {project.pdf && (
                <a
                  href={project.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-badge hover:shadow-[3px_3px_0_#8B5CF6] transition-shadow text-xs"
                >
                  open PDF ↗
                </a>
              )}
            </div>
          )}

          {/* PDF embed */}
          {project.pdf && (
            <div className="border-2 border-border rounded-sm overflow-hidden">
              <iframe
                src={project.pdf}
                className="w-full"
                style={{ height: '58vh', display: 'block' }}
                title={project.title + ' PDF'}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
      onClick={onClick}
      className="card group hover:shadow-[6px_6px_0_#8B5CF6] transition-shadow duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display font-bold text-base leading-snug flex-1 group-hover:text-purple transition-colors">
          {project.title}
        </h3>
        {project.status === 'in-progress' && (
          <span className="mono text-xs px-2 py-0.5 bg-rose-50 border border-rose-300 text-rose-700 rounded-full flex-shrink-0">
            in progress
          </span>
        )}
      </div>

      <p className="font-body text-sm text-dark leading-relaxed mb-3">
        {project.description}
      </p>

      {project.tags && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="mono text-[10px] px-1.5 py-0.5 bg-green/10 border border-green/20 text-green-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <span className="underline-link mono text-xs">
        view sample work →
      </span>
    </motion.article>
  )
}

export default function Research() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section
      id="research"
      className="relative py-24 overflow-hidden"
      style={{ background: '#F7F0E3' }}
    >
      {/* Hibiscus decorations */}
      {[...Array(6)].map((_, i) => (
        <Hibiscus
          key={i}
          className={`absolute opacity-[0.12] text-rose-400 ${[
            'top-10 left-3 w-20 h-20',
            'top-40 left-2 w-16 h-16',
            'top-[28rem] left-3 w-20 h-20 rotate-12',
            'top-[44rem] left-2 w-16 h-16 -rotate-6',
            'top-[60rem] left-3 w-20 h-20',
            'top-[76rem] left-2 w-14 h-14 rotate-6',
          ][i]}`}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="mono text-muted text-xs mb-2 tracking-widest">publications & projects</p>
          <h2 className="section-title">other<br />research</h2>
          <div className="mt-3 h-1 w-20 bg-border rounded-full" />
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6 pl-8 md:pl-0">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onClick={() => setSelected(p)}
            />
          ))}
        </div>

        {/* Also see coding projects note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-5 border-2 border-dashed border-border/50 rounded-sm text-center"
        >
          <p className="font-body text-sm text-muted italic">
            Also see my coding & data science projects on{' '}
            <a
              href="https://github.com/layesh1"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-link not-italic font-medium text-dark"
            >
              GitHub ↗
            </a>
            {' '}— including the WildfireAlert system, DTSC capstone, and WiDS datathon work.
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

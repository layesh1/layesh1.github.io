import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import { posts, type Post } from '../posts'
import ConfessionJar from './ConfessionJar'

const TAG_COLORS: Record<string, string> = {
  reflection: 'bg-blue/20 text-blue-700 border-blue/40',
  misc:       'bg-purple/20 text-purple-700 border-purple/40',
  research:   'bg-green/20 text-green-700 border-green/40',
  policy:     'bg-rose/20 text-rose-700 border-rose/40',
}

function PostCard({ post, onClick, index }: { post: Post; onClick: () => void; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="card group cursor-pointer hover:shadow-[6px_6px_0_#5BC8E8] transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`mono text-xs px-2 py-0.5 rounded-full border ${TAG_COLORS[post.tag] ?? 'bg-muted/10 text-muted border-muted/30'}`}
        >
          {post.tag}
        </span>
      </div>

      <h3 className="font-display font-bold text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors">
        {post.title}
      </h3>
      <p className="font-body text-sm text-muted leading-relaxed mb-4">{post.excerpt}</p>
      <span className="underline-link mono text-xs">read →</span>
    </motion.article>
  )
}

function PostView({ post, onBack }: { post: Post; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <button
        onClick={onBack}
        className="mono text-xs text-muted hover:text-dark transition-colors mb-8 flex items-center gap-2"
      >
        ← back to blog
      </button>

      <div className="flex items-center gap-3 mb-4">
        <span
          className={`mono text-xs px-2 py-0.5 rounded-full border ${TAG_COLORS[post.tag] ?? ''}`}
        >
          {post.tag}
        </span>
      </div>

      <h1 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-8">
        {post.title}
      </h1>

      <div className="prose-lena">
        <ReactMarkdown
          remarkPlugins={[remarkBreaks]}
          components={{
            a({ href, children }) {
              const text = String(children)
              if (text === 'YOUTUBE' && href) {
                const videoId = href.match(/[?&]v=([^&]+)/)?.[1]
                if (videoId) {
                  return (
                    <span className="block my-6 aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className="w-full h-full rounded-lg"
                        style={{ aspectRatio: '16/9', display: 'block', border: 'none' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube video"
                      />
                    </span>
                  )
                }
              }
              return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
            },
            img({ src, alt }) {
              return (
                <span className="block my-8">
                  <img
                    src={src}
                    alt={alt}
                    className="w-full rounded-lg object-cover"
                    style={{ maxHeight: '480px' }}
                  />
                  {alt && <span className="block text-center font-body text-xs text-muted mt-2 italic">{alt}</span>}
                </span>
              )
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </motion.div>
  )
}

export default function Blog() {
  const [activePost, setActivePost] = useState<Post | null>(null)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section
      id="blog"
      className="relative py-24"
      style={{ background: '#F7F0E3', borderTop: '2px solid #2D2D2D' }}
    >
      {/* Decorative ruled lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(180deg, transparent, transparent 31px, #2D2D2D 31px, #2D2D2D 32px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <AnimatePresence mode="wait">
          {!activePost && (
            <motion.div
              key="header"
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-14"
            >
              <p className="mono text-muted text-xs mb-2 tracking-widest">writing & thoughts</p>
              <h2 className="section-title">blog &<br />miscellaneous</h2>
              <div className="mt-3 h-1 w-20 bg-border rounded-full" />
              <p className="font-body text-muted text-sm mt-4 max-w-md italic">
                Note: who is genuinely reading these other than my close friends
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post list / post view */}
        <AnimatePresence mode="wait">
          {activePost ? (
            <PostView
              key={activePost.slug}
              post={activePost}
              onBack={() => setActivePost(null)}
            />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {posts.map((p, i) => (
                  <PostCard
                    key={p.slug}
                    post={p}
                    index={i}
                    onClick={() => setActivePost(p)}
                  />
                ))}

                {/* "More coming" card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="card border-dashed flex flex-col items-center justify-center text-center py-10 text-muted"
                >
                  <p className="font-body text-sm italic">more posts coming soon</p>
                  <p className="mono text-xs mt-1">check back later</p>
                </motion.div>
              </div>

              {/* Confession jar */}
              <ConfessionJar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Inline prose styles for blog posts */}
      <style>{`
        .prose-lena h1, .prose-lena h2, .prose-lena h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          margin-top: 2em;
          margin-bottom: 0.5em;
          line-height: 1.2;
        }
        .prose-lena h1 { font-size: 1.75rem; }
        .prose-lena h2 { font-size: 1.25rem; border-bottom: 1px solid #2D2D2D33; padding-bottom: 0.4em; }
        .prose-lena h3 { font-size: 1rem; }
        .prose-lena p  { font-family: 'Lora', serif; font-size: 1rem; line-height: 1.8; margin-bottom: 1.2em; color: #1C1917; }
        .prose-lena em { font-style: italic; color: #6B6458; }
        .prose-lena strong { font-weight: 700; }
        .prose-lena ul { list-style: disc; padding-left: 1.5em; margin-bottom: 1.2em; }
        .prose-lena li { font-family: 'Lora', serif; font-size: 1rem; line-height: 1.7; margin-bottom: 0.4em; }
        .prose-lena a  { text-decoration: underline; text-decoration-style: dotted; }
        .prose-lena blockquote { border-left: 3px solid #C4A882; margin: 2em 0; padding: 0.8em 1.4em; background: #F0E8D8; border-radius: 0 6px 6px 0; font-family: 'Lora', serif; font-size: 0.93rem; line-height: 1.9; color: #3D3530; }
        .prose-lena blockquote p { font-size: 0.93rem; margin-bottom: 0.6em; color: #3D3530; }
        .prose-lena blockquote em { color: #5a4a3a; }
      `}</style>
    </section>
  )
}

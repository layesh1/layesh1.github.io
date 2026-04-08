export default function Footer() {
  return (
    <footer
      className="border-t-2 border-border py-10 px-6"
      style={{ background: '#1C1917' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-cream text-lg">lena ayesh</p>
          <p className="mono text-xs text-muted mt-1">
            data science · political science · international studies
          </p>
          <p className="mono text-xs text-muted">UNC Charlotte</p>
        </div>

        <div className="flex gap-5 items-center">
          <a
            href="mailto:layesh1@charlotte.edu"
            className="mono text-xs text-parchment hover:text-cream transition-colors underline-offset-2 hover:underline"
          >
            layesh1@charlotte.edu
          </a>
          <a
            href="https://github.com/layesh1"
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-xs text-parchment hover:text-cream transition-colors"
            aria-label="GitHub"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/lena-ayesh/"
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-xs text-parchment hover:text-cream transition-colors"
            aria-label="LinkedIn"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
        <p className="mono text-xs text-muted">
          © {new Date().getFullYear()} Lena Ayesh
        </p>
        <p className="mono text-xs text-muted">
          built with React + Vite · hosted on GitHub Pages
        </p>
      </div>
    </footer>
  )
}

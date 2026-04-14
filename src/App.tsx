import { useState } from 'react'
import './App.css'

function DemoCrashButton() {
  const [shouldCrash, setShouldCrash] = useState(false)

  if (shouldCrash) {
    throw new Error('Demo crash triggered')
  }

  return (
    <button
      type="button"
      className="demo-button"
      onClick={() => setShouldCrash(true)}
    >
      Trigger Error Boundary
    </button>
  )
}

function App() {
  const isDevelopment = import.meta.env.DEV

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">ATIM 2026 Conference Demo</p>
        <h1>Viking Sasquatch AI Fleet</h1>
        <p className="lead">
          Live-built React app scaffold, ready for the demo flow and protected by a
          top-level error boundary.
        </p>
        {isDevelopment ? <DemoCrashButton /> : null}
      </section>

      <section className="status-grid" aria-label="Demo status">
        <article className="status-card">
          <h2>Stack</h2>
          <p>React + Vite + TypeScript</p>
        </article>
        <article className="status-card">
          <h2>Safety</h2>
          <p>Sanitized error logging and production-safe fallback UI</p>
        </article>
        <article className="status-card">
          <h2>Recovery</h2>
          <p>Single-click hard reload for quick on-stage recovery</p>
        </article>
      </section>
    </main>
  )
}

export default App

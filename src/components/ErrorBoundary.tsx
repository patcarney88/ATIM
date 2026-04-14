import { Component, type ErrorInfo, type ReactNode } from 'react'
import { logError } from '../lib/logger'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logError(error, { componentStack: errorInfo.componentStack ?? undefined })
  }

  private handleReload = (): void => {
    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.hasError) {
      const isDevelopment = import.meta.env.DEV

      return (
        <main className="error-shell" role="alert" aria-live="assertive">
          <section className="error-card">
            <p className="error-eyebrow">ATIM 2026 Demo</p>
            <h1>Something went wrong.</h1>
            <p className="error-copy">
              Please reload the page to get the demo back on track.
            </p>
            {isDevelopment && this.state.error ? (
              <pre className="error-debug">{this.state.error.message}</pre>
            ) : null}
            <button type="button" className="reload-button" onClick={this.handleReload}>
              Reload
            </button>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

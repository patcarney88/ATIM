import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ReactElement } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

function ThrowOnRender(): ReactElement {
  throw new Error('kaboom')
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the fallback UI when a child throws', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    render(
      <ErrorBoundary>
        <ThrowOnRender />
      </ErrorBoundary>,
    )

    expect(screen.getByRole('heading', { name: 'Something went wrong.' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument()
    expect(screen.getByText('Please reload the page to get the demo back on track.')).toBeInTheDocument()
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('shows the detailed error message in development mode only', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    render(
      <ErrorBoundary>
        <ThrowOnRender />
      </ErrorBoundary>,
    )

    expect(screen.getByText('kaboom')).toBeInTheDocument()
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('reloads the page when the reload button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const reloadSpy = vi.fn()

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadSpy },
    })

    render(
      <ErrorBoundary>
        <ThrowOnRender />
      </ErrorBoundary>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Reload' }))

    expect(reloadSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalled()
  })
})

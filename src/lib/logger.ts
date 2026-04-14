type ErrorContext = {
  componentStack?: string
}

const SENSITIVE_PATTERNS = [
  /(bearer\s+[a-z0-9._-]+)/gi,
  /(token["'\s:=]+[a-z0-9._-]+)/gi,
  /(authorization["'\s:=]+[a-z0-9._-]+)/gi,
  /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi,
]

function sanitize(value: string): string {
  return SENSITIVE_PATTERNS.reduce(
    (output, pattern) => output.replace(pattern, '[redacted]'),
    value,
  )
}

export function logError(error: Error, context?: ErrorContext): void {
  const payload = {
    name: sanitize(error.name),
    message: sanitize(error.message),
    componentStack: context?.componentStack
      ? sanitize(context.componentStack)
      : undefined,
  }

  console.error('ATIM_ERROR_BOUNDARY', payload)
}

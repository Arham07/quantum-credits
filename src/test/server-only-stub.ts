/**
 * Vitest alias for the `server-only` package.
 *
 * `server-only` throws when imported outside a React Server Component, which
 * makes server-only modules (content, formatters) untestable in jsdom. The
 * real guard still protects the app build; this stub only affects tests.
 */
export {};

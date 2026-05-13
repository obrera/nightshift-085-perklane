import type { ReactNode } from 'react'

export function PerklaneShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[calc(100vh-4rem)] overflow-hidden bg-[#05070a] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,255,54,0.12),transparent_34%),linear-gradient(180deg,rgba(255,191,71,0.06),transparent_45%)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 px-3 py-4 sm:px-5 lg:px-8">{children}</div>
    </main>
  )
}

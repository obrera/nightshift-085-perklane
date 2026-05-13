import type { PerklanePass } from '@/features/perklane/util/perklane-types'

export function PassSelector({
  passes,
  selectedPassId,
  setSelectedPassId,
}: {
  passes: PerklanePass[]
  selectedPassId: string
  setSelectedPassId: (passId: string) => void
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {passes.map((pass) => (
        <button
          className={`min-h-24 rounded-md border p-3 text-left transition ${
            selectedPassId === pass.id
              ? 'border-lime-300 bg-lime-300/10 text-white'
              : 'border-zinc-800 bg-zinc-950/80 text-zinc-300 hover:border-zinc-600'
          }`}
          key={pass.id}
          onClick={() => setSelectedPassId(pass.id)}
          type="button"
        >
          <span className="mb-3 block h-1.5 rounded-full" style={{ backgroundColor: pass.accent }} />
          <span className="block text-sm font-bold">{pass.venueName}</span>
          <span className="mt-1 block text-xs leading-5 text-zinc-400">{pass.passName}</span>
        </button>
      ))}
    </div>
  )
}

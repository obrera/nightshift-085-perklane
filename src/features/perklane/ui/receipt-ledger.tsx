import type { PerklaneReceipt } from '@/features/perklane/util/perklane-types'

export function ReceiptLedger({ receipts }: { receipts: PerklaneReceipt[] }) {
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold tracking-[0.18em] text-zinc-300 uppercase">Receipt tape</h2>
        <span className="rounded bg-zinc-900 px-2 py-1 text-xs text-zinc-400">{receipts.length} stamps</span>
      </div>
      <div className="mt-3 max-h-72 space-y-2 overflow-auto pr-1">
        {receipts.length === 0 ? (
          <p className="rounded border border-dashed border-zinc-800 p-4 text-sm text-zinc-500">
            Signed visit receipts appear here for kiosk verification.
          </p>
        ) : null}
        {receipts.map((receipt) => (
          <article className="rounded-md border border-zinc-800 bg-black/40 p-3" key={receipt.hash}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs text-lime-200">{receipt.hash}</span>
              <span className="text-xs text-amber-200">Stamp {receipt.payload.stampIndex}</span>
            </div>
            <p className="mt-2 text-xs break-all text-zinc-400">{receipt.signature.slice(0, 120)}...</p>
          </article>
        ))}
      </div>
    </section>
  )
}

import { Check, Circle, TicketCheck } from 'lucide-react'

import type { PerklanePass, PerklaneReceipt, PerklaneRuleSet } from '@/features/perklane/util/perklane-types'

import { Button } from '@/core/ui/button'
import { getEligibility } from '@/features/perklane/util/receipt-codec'

export function StampCard({
  isSigning,
  onSign,
  receipts,
  rules,
  selectedPass,
  signingError,
}: {
  isSigning: boolean
  onSign: () => void
  receipts: PerklaneReceipt[]
  rules: PerklaneRuleSet
  selectedPass: PerklanePass
  signingError: Error | null
}) {
  const latestReceipt = receipts[0]
  const eligibility = getEligibility({ latestReceipt, receiptCount: receipts.length, rules })
  const stamps = Array.from({ length: rules.stampsRequired }, (_, index) => index < receipts.length)
  const progress = Math.min(100, Math.round((receipts.length / rules.stampsRequired) * 100))

  return (
    <section className="rounded-lg border border-lime-300/20 bg-[#080c10]/95 p-4 shadow-xl shadow-black/40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.18em] text-lime-200 uppercase">{selectedPass.venueName}</p>
          <h2 className="mt-1 text-2xl font-black text-white">{selectedPass.tierName}</h2>
          <p className="mt-2 max-w-xl text-sm text-zinc-300">{selectedPass.perk}</p>
        </div>
        <div className="rounded-md border border-amber-300/25 bg-amber-300/10 px-3 py-2 text-xs text-amber-100">
          {eligibility === 'unlocked' ? 'Perk unlocked' : `${progress}% toward unlock`}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {stamps.map((filled, index) => (
          <div
            className={`flex aspect-square items-center justify-center rounded-md border ${
              filled ? 'border-lime-300 bg-lime-300 text-black' : 'border-zinc-700 bg-black/40 text-zinc-600'
            }`}
            key={`${selectedPass.id}-${index}`}
          >
            {filled ? <Check className="size-7" /> : <Circle className="size-7" />}
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="rounded-md border border-zinc-800 bg-black/45 p-3">
          <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase">Last receipt</p>
          <p className="mt-2 font-mono text-xs break-all text-lime-100">{latestReceipt?.hash ?? 'No receipt yet'}</p>
          <p className="mt-2 text-xs text-zinc-400">
            Cooldown {rules.cooldownHours}h / window {rules.stampWindowDays}d / signature{' '}
            {latestReceipt?.verifierStatus ?? 'waiting'}
          </p>
        </div>
        <Button
          className="h-11 bg-lime-300 px-4 text-sm font-black text-black hover:bg-lime-200"
          disabled={isSigning || eligibility === 'cooldown'}
          onClick={onSign}
          type="button"
        >
          <TicketCheck className="size-5" />
          {isSigning ? 'Signing receipt' : 'Sign check-in'}
        </Button>
      </div>
      {signingError ? <p className="mt-3 text-sm text-red-300">{signingError.message}</p> : null}
    </section>
  )
}

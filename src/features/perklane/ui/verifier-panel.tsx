import { BadgeCheck, ScanLine, ShieldAlert } from 'lucide-react'

import type { PerklaneVerification } from '@/features/perklane/util/perklane-types'

import { Textarea } from '@/core/ui/textarea'

export function VerifierPanel({
  latestReceiptCode,
  receiptInput,
  setReceiptInput,
  verification,
}: {
  latestReceiptCode: string
  receiptInput: string
  setReceiptInput: (value: string) => void
  verification: PerklaneVerification
}) {
  return (
    <section className="rounded-lg border border-amber-300/20 bg-[#0d0b07]/95 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.18em] text-amber-200 uppercase">Operator verifier</p>
          <h2 className="mt-1 text-xl font-black text-white">Scan or paste receipt code</h2>
        </div>
        <ScanLine className="size-8 text-amber-300" />
      </div>
      <Textarea
        className="mt-4 min-h-32 border-amber-300/20 bg-black/55 font-mono text-xs text-amber-50"
        onChange={(event) => setReceiptInput(event.target.value)}
        placeholder={
          latestReceiptCode ? 'Using latest signed receipt. Paste another JSON code to test it.' : 'No receipt yet.'
        }
        value={receiptInput}
      />
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <VerifierStat label="Pass" value={verification.passLabel} />
        <VerifierStat label="Tier" value={verification.tierLabel} />
        <VerifierStat label="Hash" value={verification.hashMatches ? 'canonical match' : 'mismatch'} />
        <VerifierStat label="Signature" value={verification.signatureLooksValid ? 'base64 structure OK' : 'invalid'} />
      </div>
      <div
        className={`mt-4 flex items-start gap-2 rounded-md border p-3 text-sm ${
          verification.status === 'accepted'
            ? 'border-lime-300/30 bg-lime-300/10 text-lime-100'
            : 'border-red-300/30 bg-red-500/10 text-red-100'
        }`}
      >
        {verification.status === 'accepted' ? <BadgeCheck className="size-5" /> : <ShieldAlert className="size-5" />}
        <span>{verification.message}</span>
      </div>
    </section>
  )
}

function VerifierStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-md border border-zinc-800 bg-black/45 p-3">
      <p className="text-[0.65rem] tracking-[0.16em] text-zinc-500 uppercase">{label}</p>
      <p className="mt-1 truncate text-sm text-zinc-100">{value}</p>
    </div>
  )
}

import { BadgeCheck, RadioTower, WalletCards } from 'lucide-react'

import { SolanaUiWalletDialog } from '@/solana/ui/solana-ui-wallet-dialog'

export function PerklaneHero({ connectedLabel }: { connectedLabel?: string }) {
  return (
    <section className="grid gap-3 rounded-lg border border-lime-300/20 bg-zinc-950/80 p-4 shadow-2xl shadow-lime-950/30 backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:items-end">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold tracking-[0.18em] text-lime-200 uppercase">
          <span className="rounded bg-lime-300 px-2 py-1 text-black">PerkLane</span>
          <span>Solana week access pass workbench</span>
        </div>
        <h1 className="max-w-3xl text-3xl leading-tight font-black text-white sm:text-5xl">
          Glossy venue stamps, signed at the wallet lane.
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-300">
          Customers claim deterministic check-in receipts, operators verify the canonical payload and signature
          structure, and the issue plan is staged for MPL Core loyalty passes without claiming a live mint.
        </p>
      </div>
      <div className="grid gap-2 rounded-md border border-zinc-800 bg-black/50 p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs tracking-[0.18em] text-amber-200 uppercase">Wallet lane</span>
          <SolanaUiWalletDialog />
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs text-zinc-300">
          <span className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-950 p-2">
            <WalletCards className="size-4 text-lime-300" /> Stamp
          </span>
          <span className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-950 p-2">
            <BadgeCheck className="size-4 text-amber-300" /> Verify
          </span>
          <span className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-950 p-2">
            <RadioTower className="size-4 text-cyan-300" /> Tune
          </span>
        </div>
        <p className="rounded bg-lime-300/10 px-2 py-1 font-mono text-xs break-words text-lime-100">
          {connectedLabel ?? 'Connect a Solana wallet to sign the next receipt'}
        </p>
      </div>
    </section>
  )
}

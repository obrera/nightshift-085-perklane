import { type UiWalletAccount, useWalletUi } from '@wallet-ui/react'
import { useMemo } from 'react'

import { usePerklaneClaimSigner } from '@/features/perklane/data-access/use-perklane-claim-signer'
import { usePerklaneStorage } from '@/features/perklane/data-access/use-perklane-storage'
import { usePerklaneVerifier } from '@/features/perklane/data-access/use-perklane-verifier'
import { OperatorRules } from '@/features/perklane/ui/operator-rules'
import { PassSelector } from '@/features/perklane/ui/pass-selector'
import { PerklaneHero } from '@/features/perklane/ui/perklane-hero'
import { PerklaneShell } from '@/features/perklane/ui/perklane-shell'
import { ReceiptLedger } from '@/features/perklane/ui/receipt-ledger'
import { StampCard } from '@/features/perklane/ui/stamp-card'
import { VerifierPanel } from '@/features/perklane/ui/verifier-panel'
import { getMplCoreReadinessMetadata } from '@/features/perklane/util/mpl-core-readiness'

export function PerklaneFeature() {
  const { account } = useWalletUi()

  return (
    <PerklaneShell>
      <PerklaneHero connectedLabel={account?.address} />
      {account ? <PerklaneConnected account={account} /> : <PerklaneDisconnected />}
    </PerklaneShell>
  )
}

function PerklaneConnected({ account }: { account: UiWalletAccount }) {
  const storage = usePerklaneStorage()
  const latestReceipt = storage.selectedReceipts[0]
  const verifier = usePerklaneVerifier({ receipts: storage.receipts })
  const mplCore = useMemo(() => getMplCoreReadinessMetadata(), [])
  const claimSigner = usePerklaneClaimSigner({
    account,
    latestReceipt,
    onReceipt: storage.addReceipt,
    receiptCount: storage.selectedReceipts.length,
    rules: storage.rules,
    selectedPass: storage.selectedPass,
  })

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.82fr]">
      <div className="space-y-4">
        <PassSelector
          passes={storage.passes}
          selectedPassId={storage.selectedPassId}
          setSelectedPassId={storage.setSelectedPassId}
        />
        <StampCard
          isSigning={claimSigner.isSigning}
          onSign={() => void claimSigner.signClaim()}
          receipts={storage.selectedReceipts}
          rules={storage.rules}
          selectedPass={storage.selectedPass}
          signingError={claimSigner.signingError}
        />
        <ReceiptLedger receipts={storage.receipts} />
      </div>
      <div className="space-y-4">
        <VerifierPanel
          latestReceiptCode={verifier.latestReceiptCode}
          receiptInput={verifier.receiptInput}
          setReceiptInput={verifier.setReceiptInput}
          verification={verifier.verification}
        />
        <OperatorRules mplCore={mplCore} rules={storage.rules} setRules={storage.setRules} />
      </div>
    </div>
  )
}

function PerklaneDisconnected() {
  return (
    <section className="grid gap-3 rounded-lg border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-zinc-300 md:grid-cols-3">
      <p>Connect a Solana wallet from the header lane to unlock signed loyalty check-ins.</p>
      <p>The customer card, kiosk verifier, and operator readiness controls are all available after connection.</p>
      <p>No destination wallet paste flow is used; the member wallet signs the canonical receipt directly.</p>
    </section>
  )
}

export { PerklaneFeature as Component }

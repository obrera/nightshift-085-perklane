import { type Address, getBase64Decoder } from '@solana/kit'
import { useMutation } from '@tanstack/react-query'
import { type ReadonlyUint8Array, type UiWalletAccount, useWalletAccountMessageSigner } from '@wallet-ui/react'

import type { PerklanePass, PerklaneReceipt, PerklaneRuleSet } from '@/features/perklane/util/perklane-types'

import {
  buildCanonicalReceiptPayload,
  buildReceiptPayload,
  createReceiptHash,
  getEligibility,
} from '@/features/perklane/util/receipt-codec'

export function usePerklaneClaimSigner({
  account,
  latestReceipt,
  onReceipt,
  receiptCount,
  rules,
  selectedPass,
}: {
  account: UiWalletAccount
  latestReceipt?: PerklaneReceipt
  onReceipt: (receipt: PerklaneReceipt) => void
  receiptCount: number
  rules: PerklaneRuleSet
  selectedPass: PerklanePass
}) {
  const messageSigner = useWalletAccountMessageSigner(account)

  const mutation = useMutation({
    mutationFn: async () => {
      const eligibility = getEligibility({ latestReceipt, receiptCount, rules })

      if (eligibility === 'cooldown') {
        throw new Error('This card is still inside the operator cooldown window.')
      }

      const payload = buildReceiptPayload({
        pass: selectedPass,
        receiptCount,
        rules,
        walletAddress: account.address,
      })
      const canonicalPayload = buildCanonicalReceiptPayload(payload)
      const hash = createReceiptHash(canonicalPayload)
      const [result] = await messageSigner.modifyAndSignMessages([
        {
          content: new TextEncoder().encode(canonicalPayload),
          signatures: {},
        },
      ])
      const signatureBytes = result?.signatures[account.address as Address]

      if (!signatureBytes) {
        throw new Error('The wallet returned no signature for this loyalty receipt.')
      }

      return {
        canonicalPayload,
        eligibility,
        hash,
        payload,
        signature: getBase64Decoder().decode(signatureBytes as ReadonlyUint8Array),
        verifierStatus: 'signed',
      } satisfies PerklaneReceipt
    },
    onSuccess: onReceipt,
  })

  return {
    isSigning: mutation.isPending,
    signClaim: mutation.mutateAsync,
    signingError: mutation.error,
  }
}

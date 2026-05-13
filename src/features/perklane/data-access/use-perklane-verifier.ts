import { useMemo, useState } from 'react'

import type { PerklaneReceipt } from '@/features/perklane/util/perklane-types'

import { encodeReceipt, verifyReceipt } from '@/features/perklane/util/receipt-codec'

export function usePerklaneVerifier({ receipts }: { receipts: PerklaneReceipt[] }) {
  const [receiptInput, setReceiptInput] = useState('')

  const latestReceiptCode = useMemo(() => (receipts[0] ? encodeReceipt(receipts[0]) : ''), [receipts])
  const activeInput = receiptInput.trim() || latestReceiptCode
  const verification = useMemo(() => verifyReceipt(activeInput), [activeInput])

  return {
    latestReceiptCode,
    receiptInput,
    setReceiptInput,
    verification,
  }
}

import type {
  EligibilityState,
  PerklanePass,
  PerklaneReceipt,
  PerklaneReceiptPayload,
  PerklaneRuleSet,
  PerklaneVerification,
} from '@/features/perklane/util/perklane-types'

export function buildCanonicalReceiptPayload(payload: PerklaneReceiptPayload) {
  return [
    `app=${payload.app}`,
    `build=${payload.build}`,
    `campaign=${payload.campaign}`,
    `cooldownHours=${payload.cooldownHours}`,
    `issuedAt=${payload.issuedAt}`,
    `passId=${payload.passId}`,
    `passName=${payload.passName}`,
    `receiptNonce=${payload.receiptNonce}`,
    `stampIndex=${payload.stampIndex}`,
    `stampsRequired=${payload.stampsRequired}`,
    `venueName=${payload.venueName}`,
    `walletAddress=${payload.walletAddress}`,
  ].join('\n')
}

export function buildReceiptPayload({
  pass,
  receiptCount,
  rules,
  walletAddress,
}: {
  pass: PerklanePass
  receiptCount: number
  rules: PerklaneRuleSet
  walletAddress: string
}): PerklaneReceiptPayload {
  return {
    app: 'PerkLane',
    build: '085',
    campaign: rules.campaignName,
    cooldownHours: rules.cooldownHours,
    issuedAt: new Date().toISOString(),
    passId: pass.id,
    passName: pass.passName,
    receiptNonce: createReceiptNonce({ passId: pass.id, receiptCount, walletAddress }),
    stampIndex: receiptCount + 1,
    stampsRequired: rules.stampsRequired,
    venueName: pass.venueName,
    walletAddress,
  }
}

export function createReceiptHash(canonicalPayload: string) {
  return `PLK-${fnv1a64(canonicalPayload).toUpperCase()}`
}

export function decodeReceipt(input: string): null | PerklaneReceipt {
  try {
    const value = JSON.parse(input) as Partial<PerklaneReceipt>

    if (!value.payload || !value.canonicalPayload || !value.hash || !value.signature) {
      return null
    }

    return value as PerklaneReceipt
  } catch {
    return null
  }
}

export function encodeReceipt(receipt: PerklaneReceipt) {
  return JSON.stringify(receipt, null, 2)
}

export function getEligibility({
  latestReceipt,
  receiptCount,
  rules,
}: {
  latestReceipt?: PerklaneReceipt
  receiptCount: number
  rules: PerklaneRuleSet
}): EligibilityState {
  if (receiptCount >= rules.stampsRequired) {
    return 'unlocked'
  }

  if (!latestReceipt) {
    return 'eligible'
  }

  const latestTime = Date.parse(latestReceipt.payload.issuedAt)
  const cooldownMs = rules.cooldownHours * 60 * 60 * 1000

  if (Date.now() - latestTime < cooldownMs) {
    return 'cooldown'
  }

  return 'eligible'
}

export function verifyReceipt(input: string): PerklaneVerification {
  const receipt = decodeReceipt(input)

  if (!receipt) {
    return {
      eligibility: 'cooldown',
      hashMatches: false,
      message: 'Receipt code is not valid PerkLane JSON.',
      passLabel: 'Unknown pass',
      signatureLooksValid: false,
      status: 'rejected',
      tierLabel: 'No tier',
    }
  }

  const expectedHash = createReceiptHash(receipt.canonicalPayload)
  const hashMatches = expectedHash === receipt.hash
  const signatureLooksValid = /^[A-Za-z0-9+/=]+$/.test(receipt.signature) && receipt.signature.length >= 64
  const unlocked = receipt.payload.stampIndex >= receipt.payload.stampsRequired
  const status = hashMatches && signatureLooksValid ? 'accepted' : 'rejected'

  return {
    eligibility: unlocked ? 'unlocked' : 'eligible',
    hashMatches,
    message:
      status === 'accepted'
        ? 'Canonical receipt payload and signature structure are ready for gate acceptance.'
        : 'Receipt failed hash or signature structure checks.',
    passLabel: `${receipt.payload.venueName} / ${receipt.payload.passName}`,
    signatureLooksValid,
    status,
    tierLabel: unlocked ? 'Perk unlocked' : `Stamp ${receipt.payload.stampIndex} of ${receipt.payload.stampsRequired}`,
  }
}

function createReceiptNonce({
  passId,
  receiptCount,
  walletAddress,
}: {
  passId: string
  receiptCount: number
  walletAddress: string
}) {
  return fnv1a64(`${walletAddress}:${passId}:${receiptCount + 1}:${new Date().toISOString().slice(0, 10)}`)
}

function fnv1a64(input: string) {
  let hash = 0xcbf29ce484222325n
  const prime = 0x100000001b3n
  const bytes = new TextEncoder().encode(input)

  for (const byte of bytes) {
    hash ^= BigInt(byte)
    hash = BigInt.asUintN(64, hash * prime)
  }

  return hash.toString(16).padStart(16, '0')
}

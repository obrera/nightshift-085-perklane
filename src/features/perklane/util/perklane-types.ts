export type EligibilityState = 'cooldown' | 'eligible' | 'unlocked'

export type PerklanePass = {
  accent: string
  id: string
  passName: string
  perk: string
  tierName: string
  venueName: string
}

export type PerklaneReceipt = {
  canonicalPayload: string
  eligibility: EligibilityState
  hash: string
  payload: PerklaneReceiptPayload
  signature: string
  verifierStatus: 'signed' | 'structure-warning'
}

export type PerklaneReceiptPayload = {
  app: 'PerkLane'
  build: '085'
  campaign: string
  cooldownHours: number
  issuedAt: string
  passId: string
  passName: string
  receiptNonce: string
  stampIndex: number
  stampsRequired: number
  venueName: string
  walletAddress: string
}

export type PerklaneRuleSet = {
  campaignName: string
  cooldownHours: number
  readinessThreshold: number
  stampsRequired: number
  stampWindowDays: number
}

export type PerklaneVerification = {
  eligibility: EligibilityState
  hashMatches: boolean
  message: string
  passLabel: string
  signatureLooksValid: boolean
  status: 'accepted' | 'rejected'
  tierLabel: string
}

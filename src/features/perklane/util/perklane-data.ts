import type { PerklanePass, PerklaneRuleSet } from '@/features/perklane/util/perklane-types'

export const PERKLANE_PASSES: PerklanePass[] = [
  {
    accent: '#b8ff36',
    id: 'aurora-room',
    passName: 'Aurora Room six-stamp lane',
    perk: 'Priority door plus lime spritz on stamp six',
    tierName: 'Late Set Regular',
    venueName: 'Aurora Room',
  },
  {
    accent: '#ffbf47',
    id: 'platform-27',
    passName: 'Platform 27 commuter supper',
    perk: 'Seat hold and kitchen credit after four visits',
    tierName: 'Counter Seat',
    venueName: 'Platform 27',
  },
  {
    accent: '#79e7ff',
    id: 'basement-radio',
    passName: 'Basement Radio member card',
    perk: 'Guest-list unlock and merch desk discount',
    tierName: 'Frequency Holder',
    venueName: 'Basement Radio',
  },
]

export const DEFAULT_PERKLANE_RULES: PerklaneRuleSet = {
  campaignName: 'Solana Week Loyalty Lane',
  cooldownHours: 18,
  readinessThreshold: 92,
  stampsRequired: 6,
  stampWindowDays: 14,
}

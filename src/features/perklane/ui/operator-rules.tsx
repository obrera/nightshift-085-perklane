import { SlidersHorizontal } from 'lucide-react'

import type { MplCoreReadinessMetadata } from '@/features/perklane/util/mpl-core-readiness'
import type { PerklaneRuleSet } from '@/features/perklane/util/perklane-types'

import { Input } from '@/core/ui/input'

export function OperatorRules({
  mplCore,
  rules,
  setRules,
}: {
  mplCore: MplCoreReadinessMetadata
  rules: PerklaneRuleSet
  setRules: (rules: PerklaneRuleSet) => void
}) {
  return (
    <section className="rounded-lg border border-cyan-300/20 bg-[#071014]/95 p-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="size-5 text-cyan-300" />
        <h2 className="text-sm font-bold tracking-[0.18em] text-cyan-100 uppercase">Campaign readiness</h2>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <RuleInput
          label="Stamps"
          max={12}
          min={2}
          onChange={(value) => setRules({ ...rules, stampsRequired: value })}
          value={rules.stampsRequired}
        />
        <RuleInput
          label="Cooldown hours"
          max={72}
          min={0}
          onChange={(value) => setRules({ ...rules, cooldownHours: value })}
          value={rules.cooldownHours}
        />
        <RuleInput
          label="Window days"
          max={45}
          min={1}
          onChange={(value) => setRules({ ...rules, stampWindowDays: value })}
          value={rules.stampWindowDays}
        />
        <RuleInput
          label="Readiness %"
          max={100}
          min={50}
          onChange={(value) => setRules({ ...rules, readinessThreshold: value })}
          value={rules.readinessThreshold}
        />
      </div>
      <div className="mt-4 rounded-md border border-cyan-300/20 bg-black/45 p-3">
        <p className="text-xs tracking-[0.18em] text-cyan-200 uppercase">MPL Core issue plan</p>
        <p className="mt-2 text-sm text-zinc-300">{mplCore.status}</p>
        <p className="mt-2 font-mono text-xs break-all text-cyan-100">
          {mplCore.packageName} createV1 {mplCore.createV1Discriminator}
        </p>
      </div>
    </section>
  )
}

function RuleInput({
  label,
  max,
  min,
  onChange,
  value,
}: {
  label: string
  max: number
  min: number
  onChange: (value: number) => void
  value: number
}) {
  return (
    <label className="grid gap-1 text-xs text-zinc-300">
      {label}
      <Input
        className="h-10 border-cyan-300/20 bg-black/45 text-sm text-white"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        type="number"
        value={value}
      />
    </label>
  )
}

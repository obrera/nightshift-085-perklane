import { useCallback, useMemo, useState } from 'react'

import type { PerklaneReceipt, PerklaneRuleSet } from '@/features/perklane/util/perklane-types'

import { DEFAULT_PERKLANE_RULES, PERKLANE_PASSES } from '@/features/perklane/util/perklane-data'

const RECEIPTS_KEY = 'perklane:receipts'
const RULES_KEY = 'perklane:rules'
const SELECTED_PASS_KEY = 'perklane:selected-pass'

export function usePerklaneStorage() {
  const [receipts, setReceipts] = useState<PerklaneReceipt[]>(readReceipts)
  const [rules, setRulesState] = useState<PerklaneRuleSet>(readRules)
  const [selectedPassId, setSelectedPassIdState] = useState(readSelectedPassId)

  const selectedPass = useMemo(
    () => PERKLANE_PASSES.find((pass) => pass.id === selectedPassId) ?? PERKLANE_PASSES[0],
    [selectedPassId],
  )

  const selectedReceipts = useMemo(
    () => receipts.filter((receipt) => receipt.payload.passId === selectedPass.id),
    [receipts, selectedPass.id],
  )

  const addReceipt = useCallback((receipt: PerklaneReceipt) => {
    setReceipts((current) => {
      const next = [receipt, ...current]
      writeJson(RECEIPTS_KEY, next)
      return next
    })
  }, [])

  const setRules = useCallback((nextRules: PerklaneRuleSet) => {
    setRulesState(nextRules)
    writeJson(RULES_KEY, nextRules)
  }, [])

  const setSelectedPassId = useCallback((nextPassId: string) => {
    setSelectedPassIdState(nextPassId)
    localStorage.setItem(SELECTED_PASS_KEY, nextPassId)
  }, [])

  return {
    addReceipt,
    passes: PERKLANE_PASSES,
    receipts,
    rules,
    selectedPass,
    selectedPassId,
    selectedReceipts,
    setRules,
    setSelectedPassId,
  }
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const rawValue = localStorage.getItem(key)

    if (!rawValue) {
      return fallback
    }

    return JSON.parse(rawValue) as T
  } catch {
    return fallback
  }
}

function readReceipts(): PerklaneReceipt[] {
  return readJson(RECEIPTS_KEY, [])
}

function readRules(): PerklaneRuleSet {
  return readJson(RULES_KEY, DEFAULT_PERKLANE_RULES)
}

function readSelectedPassId() {
  return localStorage.getItem(SELECTED_PASS_KEY) ?? PERKLANE_PASSES[0].id
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

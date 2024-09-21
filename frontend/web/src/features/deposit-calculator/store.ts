import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { calculationsClient } from '@/config/api'

interface CalculateCashRequest {
  principal: number
  interestRate: number
  investmentTermMonths: number
  extraDepositAmount: number
  extraDepositFrequency: 'week' | 'fortnight' | 'month' | 'year'
}

interface CalculateCashResponse {
  finalBalance: number
  totalInterestEarned: number
  totalExtraDeposits: number
}

export const useDepositCalculatorStore = defineStore('deposit-calculator', () => {
  const principal = ref(0)
  const interestRate = ref(0)
  const investmentTermMonths = ref(0)
  const extraDepositAmount = ref(0)
  const extraDepositFrequency = ref<'week' | 'fortnight' | 'month' | 'year'>('week')

  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref<CalculateCashResponse | null>(null)

  async function calculateCash() {
    try {
      error.value = null
      result.value = null
      loading.value = true
      const response = await calculationsClient.post(
        '/deposits-savings-calculator/deposits/cash/',
        {
          principal: Number(principal.value),
          interestRate: Number(interestRate.value),
          investmentTermMonths: Number(investmentTermMonths.value),
          extraDepositAmount: Number(extraDepositAmount.value),
          extraDepositFrequency: extraDepositFrequency.value
        }
      )
      result.value = response.data
    } catch (err) {
      error.value = err as string
    } finally {
      loading.value = false
    }

    return { result, loading, error }
  }

  return {
    calculateCash,
    principal,
    interestRate,
    investmentTermMonths,
    extraDepositAmount,
    extraDepositFrequency,
    result,
    loading,
    error
  }
})

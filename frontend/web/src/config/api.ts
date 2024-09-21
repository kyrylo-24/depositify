import { createFetch } from '@vueuse/core'

const baseUrl = import.meta.env.VITE_API_BASE_URL

if (!baseUrl) {
  throw new Error('VITE_API_BASE_URL is not set')
}

export const useApiClient = createFetch({
  baseUrl
})

export interface CalculateCashRequest {
  principal: number
  interestRate: number
  investmentTermMonths: number
  extraDepositAmount: number
  extraDepositFrequency: 'week' | 'fortnight' | 'month' | 'year'
}

export interface CalculateCashResponse {
  finalBalance: number
  totalInterestEarned: number
  totalExtraDeposits: number
}

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useApiClient, type CalculateCashResponse } from '@/config/api'

const principal = ref(0)
const interestRate = ref(0)
const investmentTermMonths = ref(0)
const extraDepositAmount = ref(0)
const extraDepositFrequency = ref<'week' | 'fortnight' | 'month' | 'year'>('week')

const { data, isFetching, error, execute } = useApiClient<CalculateCashResponse>(
  'calculations/deposits-savings-calculator/deposits/cash/',
  {
    immediate: false
  }
)
  .post(
    reactive({
      principal,
      interestRate,
      investmentTermMonths,
      extraDepositAmount,
      extraDepositFrequency
    })
  )
  .json()

const handleIncreaseInterestRate = () => {
  if (interestRate.value === 100) return

  interestRate.value = +(interestRate.value + 0.1).toFixed(2)
}

const handleDecreaseInterestRate = () => {
  if (interestRate.value === 0) return

  interestRate.value = +(interestRate.value - 0.1).toFixed(2)
}

const handleManualSetInterestRate = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  if (Number(value) > 100) {
    interestRate.value = 100
  } else if (Number(value) < 0) {
    interestRate.value = 0
  } else {
    interestRate.value = Number(value)
  }
}

const finalBalance = computed(() => data.value?.finalBalance)
const totalInterestEarned = computed(() => data.value?.totalInterestEarned)
const totalExtraDeposits = computed(() => data.value?.totalExtraDeposits)
</script>

<template>
  <div>
    <h2>Deposit Calculator</h2>
    <div class="input-group">
      <label for="principal">Principal:</label>
      <input class="input-principal" type="number" id="principal" v-model="principal" />
      <input type="range" v-model.number="principal" min="0" max="1000000" step="1000" />
    </div>

    <div class="input-group">
      <label for="interestRate">Interest Rate (%):</label>
      <input
        type="number"
        id="interestRate"
        v-model.number="interestRate"
        min="0"
        step="0.01"
        max="100"
        @input="handleManualSetInterestRate"
      />
      <button @click="handleIncreaseInterestRate">+</button>
      <button @click="handleDecreaseInterestRate">-</button>
    </div>

    <div class="input-group">
      <label for="investmentTermMonths">Investment Term (Months):</label>
      <input
        type="number"
        id="investmentTermMonths"
        v-model="investmentTermMonths"
        min="0"
        step="1"
      />
    </div>

    <div class="input-group">
      <label for="extraDepositAmount">Extra Deposit Amount:</label>
      <input
        type="number"
        id="extraDepositAmount"
        v-model="extraDepositAmount"
        min="0"
        step="100"
      />
    </div>

    <div class="input-group">
      <label for="extraDepositFrequency">Extra Deposit Frequency:</label>
      <select id="extraDepositFrequency" v-model="extraDepositFrequency">
        <option value="week">Weekly</option>
        <option value="fortnight">Fortnightly</option>
        <option value="month">Monthly</option>
        <option value="year">Yearly</option>
      </select>
    </div>

    <button @click="execute()">Calculate</button>

    <div v-if="isFetching">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="data">
      <div>Final Balance: {{ finalBalance }}</div>
      <div>Total Interest Earned: {{ totalInterestEarned }}</div>
      <div>Total Extra Deposits: {{ totalExtraDeposits }}</div>
    </div>
  </div>
</template>

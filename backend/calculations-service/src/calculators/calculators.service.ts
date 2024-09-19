import { Injectable } from '@nestjs/common';
import { ExtraDepositFrequency } from 'src/common/types/calculations.types';

/**
 * This service provides various financial calculations that can be used across the banking application.
 * It includes calculations for different banking products and scenarios, such as:
 * - Deposit savings
 * - Loan repayments
 * - Mortgage calculations
 * - Investment returns
 * - Retirement planning
 *
 * These calculations can be utilized by different modules within the application to provide
 * accurate financial projections and insights to users.
 */
@Injectable()
export class CalculatorsService {
  /**
   * Calculates the final balance and total interest earned for a cash savings investment.
   *
   * @param principal - The initial investment amount
   * @param interestRate - The annual interest rate as a percentage (e.g., 0.25 for 0.25%)
   * @param investmentTermMonths - The total investment period in months
   * @param extraDeposit - The amount of extra deposits
   * @param extraDepositFrequency - The frequency of extra deposits (weekly, fortnightly, monthly, or yearly)
   * @returns An object containing the finalBalance, totalInterestEarned, and totalExtraDeposits
   */
  calculateCashSavings(
    principal: number,
    interestRate: number,
    investmentTermMonths: number,
    extraDeposit: number,
    extraDepositFrequency: ExtraDepositFrequency,
  ): {
    finalBalance: number;
    totalInterestEarned: number;
    totalExtraDeposits: number;
  } {
    const annualInterestRate = interestRate / 100;

    // Initialize the balance with the principal amount
    let balance = principal;
    // Keep track of the total extra deposits made
    let totalExtraDeposits = 0;
    // Variable to store the calculated monthly extra deposit
    let monthlyExtraDeposit = 0;

    // Convert extra deposit frequency to monthly deposit amount
    switch (extraDepositFrequency) {
      case ExtraDepositFrequency.WEEK:
        monthlyExtraDeposit = (extraDeposit * 52) / 12;
        break;
      case ExtraDepositFrequency.FORTNIGHT:
        monthlyExtraDeposit = (extraDeposit * 26) / 12;
        break;
      case ExtraDepositFrequency.MONTH:
        monthlyExtraDeposit = extraDeposit;
        break;
      case ExtraDepositFrequency.YEAR:
        monthlyExtraDeposit = extraDeposit / 12;
        break;
    }

    // Loop through each month of the investment term
    for (let month = 1; month <= investmentTermMonths; month++) {
      // Add the monthly extra deposit to the balance
      balance += monthlyExtraDeposit;
      // Keep track of the total extra deposits made
      totalExtraDeposits += monthlyExtraDeposit;
      // Apply the monthly interest rate to the balance
      balance += balance * (annualInterestRate / 12);
    }

    const finalBalance = Math.round(balance);
    const totalInterestEarned = Math.round(
      finalBalance - principal - totalExtraDeposits,
    );

    return {
      finalBalance,
      totalInterestEarned,
      totalExtraDeposits: Math.round(totalExtraDeposits),
    };
  }
}

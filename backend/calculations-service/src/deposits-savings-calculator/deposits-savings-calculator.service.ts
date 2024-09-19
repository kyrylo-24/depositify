import { Injectable } from '@nestjs/common';
import { CashDepositDto } from './dto/cash-deposit.dto';
import { CalculatorsService } from 'src/calculators/calculators.service';

@Injectable()
export class DepositsSavingsCalculatorService {
  constructor(private readonly calculatorsService: CalculatorsService) {}

  calculateCashDeposit(cashDepositData: CashDepositDto) {
    return this.calculatorsService.calculateCashSavings(
      cashDepositData.principal,
      cashDepositData.interestRate,
      cashDepositData.investmentTermMonths,
      cashDepositData.extraDepositAmount,
      cashDepositData.extraDepositFrequency,
    );
  }
}

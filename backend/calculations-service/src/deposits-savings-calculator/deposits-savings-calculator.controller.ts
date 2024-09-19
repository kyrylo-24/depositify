import { Body, Controller, Post } from '@nestjs/common';
import { DepositsSavingsCalculatorService } from './deposits-savings-calculator.service';
import { CashDepositDto } from './dto/cash-deposit.dto';

@Controller('deposits-savings-calculator')
export class DepositsSavingsCalculatorController {
  constructor(
    private readonly depositsSavingsCalculatorService: DepositsSavingsCalculatorService,
  ) {}

  @Post('deposits/cash')
  calculateCashDeposit(@Body() cashDepositData: CashDepositDto) {
    return this.depositsSavingsCalculatorService.calculateCashDeposit(
      cashDepositData,
    );
  }
}

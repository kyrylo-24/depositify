import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DepositsSavingsCalculatorService } from './deposits-savings-calculator.service';
import { CashDepositDto } from './dto/cash-deposit.dto';

@Controller('deposits-savings-calculator')
export class DepositsSavingsCalculatorController {
  constructor(
    private readonly depositsSavingsCalculatorService: DepositsSavingsCalculatorService,
  ) {}

  @ApiOperation({ summary: 'Calculate cash deposit' })
  @ApiResponse({
    status: 200,
    description: 'Cash deposit calculated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @HttpCode(200)
  @Post('deposits/cash')
  calculateCashDeposit(@Body() cashDepositData: CashDepositDto) {
    return this.depositsSavingsCalculatorService.calculateCashDeposit(
      cashDepositData,
    );
  }
}

import { Module } from '@nestjs/common';
import { DepositsSavingsCalculatorService } from './deposits-savings-calculator.service';
import { DepositsSavingsCalculatorController } from './deposits-savings-calculator.controller';
import { CalculatorsModule } from 'src/calculators/calculators.module';

@Module({
  imports: [CalculatorsModule],
  controllers: [DepositsSavingsCalculatorController],
  providers: [DepositsSavingsCalculatorService],
})
export class DepositsSavingsCalculatorModule {}

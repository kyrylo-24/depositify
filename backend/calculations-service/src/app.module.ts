import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DepositsSavingsCalculatorModule } from './deposits-savings-calculator/deposits-savings-calculator.module';
import { CalculatorsModule } from './calculators/calculators.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DepositsSavingsCalculatorModule,
    CalculatorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

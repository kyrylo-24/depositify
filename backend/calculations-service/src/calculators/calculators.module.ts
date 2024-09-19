import { Module } from '@nestjs/common';
import { CalculatorsService } from './calculators.service';

@Module({
  providers: [CalculatorsService],
  exports: [CalculatorsService],
})
export class CalculatorsModule {}

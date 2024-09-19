import { IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExtraDepositFrequency } from 'src/common/types/calculations.types';

export class CashDepositDto {
  @ApiProperty({ description: 'The initial investment amount', example: 10000 })
  @IsNumber()
  principal: number;

  @ApiProperty({
    description: 'The annual interest rate as a percentage',
    example: 0.25,
  })
  @IsNumber()
  interestRate: number;

  @ApiProperty({
    description: 'The total investment period in months',
    example: 12,
  })
  @IsNumber()
  investmentTermMonths: number;

  @ApiProperty({ description: 'The amount of extra deposits', example: 100 })
  @IsNumber()
  extraDepositAmount: number;

  @ApiProperty({
    description: 'The frequency of extra deposits',
    enum: ExtraDepositFrequency,
    example: ExtraDepositFrequency.MONTH,
  })
  @IsEnum(ExtraDepositFrequency)
  extraDepositFrequency: ExtraDepositFrequency;
}

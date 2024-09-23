import { IsNumber, IsEnum, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExtraDepositFrequency } from 'src/common/types/calculations.types';

export class CashDepositDto {
  @ApiProperty({ description: 'The initial investment amount', example: 10000 })
  @IsNumber()
  @IsPositive()
  principal: number;

  @ApiProperty({
    description: 'The annual interest rate as a percentage',
    example: 0.25,
  })
  @IsNumber()
  @IsPositive()
  interestRate: number;

  @ApiProperty({
    description: 'The total investment period in months',
    example: 12,
  })
  @IsNumber()
  @IsPositive()
  investmentTermMonths: number;

  @ApiProperty({ description: 'The amount of extra deposits', example: 100 })
  @IsNumber()
  @Min(0)
  extraDepositAmount: number;

  @ApiProperty({
    description: 'The frequency of extra deposits',
    enum: ExtraDepositFrequency,
    example: ExtraDepositFrequency.MONTH,
  })
  @IsEnum(ExtraDepositFrequency)
  extraDepositFrequency: ExtraDepositFrequency;
}

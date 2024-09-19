import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorsService } from './calculators.service';
import { ExtraDepositFrequency } from 'src/common/types/calculations.types';

describe('CalculatorsService', () => {
  let service: CalculatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorsService],
    }).compile();

    service = module.get<CalculatorsService>(CalculatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateCashSavings', () => {
    it('should correctly calculate cash savings', () => {
      const result = service.calculateCashSavings(
        10000,
        0.25,
        60,
        10,
        ExtraDepositFrequency.WEEK,
      );

      expect(result.finalBalance).toBeCloseTo(12742, 0);
      expect(result.totalInterestEarned).toBeCloseTo(142, 0);
      expect(result.totalExtraDeposits).toBeCloseTo(2600, 0);
    });

    it('should handle zero extra deposits', () => {
      const result = service.calculateCashSavings(
        10000,
        0.25,
        60,
        0,
        ExtraDepositFrequency.WEEK,
      );

      expect(result.finalBalance).toBeCloseTo(10126, 0);
      expect(result.totalInterestEarned).toBeGreaterThan(0);
    });

    it('should handle different extra deposit frequencies', () => {
      const weeklyResult = service.calculateCashSavings(
        1000,
        1,
        12,
        10,
        ExtraDepositFrequency.WEEK,
      );
      const monthlyResult = service.calculateCashSavings(
        1000,
        1,
        12,
        43.33,
        ExtraDepositFrequency.MONTH,
      );

      expect(weeklyResult.finalBalance).toBeCloseTo(
        monthlyResult.finalBalance,
        0,
      );
    });
  });
});

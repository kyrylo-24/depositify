import { Test, TestingModule } from '@nestjs/testing';
import { DepositsSavingsCalculatorService } from './deposits-savings-calculator.service';

describe('DepositsSavingsCalculatorService', () => {
  let service: DepositsSavingsCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepositsSavingsCalculatorService],
    }).compile();

    service = module.get<DepositsSavingsCalculatorService>(
      DepositsSavingsCalculatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

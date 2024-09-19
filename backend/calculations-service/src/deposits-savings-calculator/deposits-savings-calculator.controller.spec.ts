import { Test, TestingModule } from '@nestjs/testing';
import { DepositsSavingsCalculatorController } from './deposits-savings-calculator.controller';
import { DepositsSavingsCalculatorService } from './deposits-savings-calculator.service';

describe('DepositsSavingsCalculatorController', () => {
  let controller: DepositsSavingsCalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepositsSavingsCalculatorController],
      providers: [DepositsSavingsCalculatorService],
    }).compile();

    controller = module.get<DepositsSavingsCalculatorController>(
      DepositsSavingsCalculatorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

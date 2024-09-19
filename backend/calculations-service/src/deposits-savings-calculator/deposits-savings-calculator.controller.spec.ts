import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CalculatorsModule } from 'src/calculators/calculators.module';
import { ExtraDepositFrequency } from 'src/common/types/calculations.types';
import { DepositsSavingsCalculatorModule } from './deposits-savings-calculator.module';

describe('DepositsSavingsCalculatorController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CalculatorsModule, DepositsSavingsCalculatorModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    await app.init();
  });

  describe('POST /deposits/cash', () => {
    it('should calculate cash deposit correctly', async () => {
      const response = await request(app.getHttpServer())
        .post('/deposits-savings-calculator/deposits/cash')
        .send({
          principal: 10000,
          interestRate: 0.25,
          investmentTermMonths: 60,
          extraDepositAmount: 10,
          extraDepositFrequency: ExtraDepositFrequency.WEEK,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('finalBalance');
      expect(response.body).toHaveProperty('totalInterestEarned');
      expect(response.body).toHaveProperty('totalExtraDeposits');
      expect(response.body.finalBalance).toBeCloseTo(12742, 0);
      expect(response.body.totalInterestEarned).toBeCloseTo(142, 0);
      expect(response.body.totalExtraDeposits).toBeCloseTo(2600, 0);
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app.getHttpServer())
        .post('/deposits-savings-calculator/deposits/cash')
        .send({
          principal: -1000,
          interestRate: 0.25,
          investmentTermMonths: 60,
          extraDepositAmount: 10,
          extraDepositFrequency: 'invalid',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message[0]).toContain('principal');
      expect(response.body.message[1]).toContain('extraDepositFrequency');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

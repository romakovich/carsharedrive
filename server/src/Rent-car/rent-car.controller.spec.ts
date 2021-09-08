import { Test, TestingModule } from '@nestjs/testing';
import { RentCarController } from './rent-car.controller';
import { RentCarService } from './Services/rent-car.service';

describe('RentCarController', () => {
  let controller: RentCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentCarController],
      providers: [RentCarService],
    }).compile();

    controller = module.get<RentCarController>(RentCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

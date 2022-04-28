import { Test, TestingModule } from '@nestjs/testing';
import { MultilinkController } from './multilink.controller';

describe('MultilinkController', () => {
  let controller: MultilinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultilinkController],
    }).compile();

    controller = module.get<MultilinkController>(MultilinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

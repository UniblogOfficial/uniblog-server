import { Test, TestingModule } from '@nestjs/testing';
import { MultilinkService } from './multilink.service';

describe('MultilinkService', () => {
  let service: MultilinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultilinkService],
    }).compile();

    service = module.get<MultilinkService>(MultilinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

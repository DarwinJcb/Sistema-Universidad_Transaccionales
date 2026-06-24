/* src/universidad/universidad.service.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { UniversidadService } from './universidad.service';

describe('UniversidadService', () => {
  let service: UniversidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversidadService],
    }).compile();

    service = module.get<UniversidadService>(UniversidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

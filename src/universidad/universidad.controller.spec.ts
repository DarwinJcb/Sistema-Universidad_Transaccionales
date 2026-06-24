/* src/universidad/universidad.controller.spec.ts: */
import { Test, TestingModule } from '@nestjs/testing';
import { UniversidadController } from './universidad.controller';

describe('UniversidadController', () => {
  let controller: UniversidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversidadController],
    }).compile();

    controller = module.get<UniversidadController>(UniversidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

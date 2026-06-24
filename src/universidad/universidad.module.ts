/* src/universidad/universidad.module.ts: */
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UniversidadController } from './universidad.controller';
import { UniversidadService } from './universidad.service';

@Module({
  controllers: [UniversidadController],
  providers: [UniversidadService, PrismaService],
})
export class UniversidadModule {}

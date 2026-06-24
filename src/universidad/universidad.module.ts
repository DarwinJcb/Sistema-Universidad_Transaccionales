/* src/universidad/universidad.module.ts: */
import { Module } from '@nestjs/common';
import { UniversidadController } from './universidad.controller';
import { UniversidadRepository } from './universidad.repository';
import { UniversidadService } from './universidad.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [UniversidadController],
    providers: [UniversidadService, UniversidadRepository, PrismaService],
})
export class UniversidadModule { }

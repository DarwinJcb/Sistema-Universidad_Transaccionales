/* src/universidad/universidad.repository.ts: */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UniversidadRepository {
  constructor(private readonly prisma: PrismaService) {}
}

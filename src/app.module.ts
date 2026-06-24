/* src/app.module.ts: */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UniversidadModule } from './universidad/universidad.module';
import { UniversidadService } from './universidad/universidad.service';
import { UniversidadController } from './universidad/universidad.controller';

@Module({
  imports: [UniversidadModule],
  controllers: [AppController, UniversidadController],
  providers: [AppService, PrismaService, UniversidadService],
})
export class AppModule {}

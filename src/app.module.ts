/* src/app.module.ts: */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UniversidadModule } from './universidad/universidad.module';

@Module({
  imports: [UniversidadModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

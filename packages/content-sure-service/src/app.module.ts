import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppRepo } from './app.repo';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService, AppRepo],
})
export class AppModule {}

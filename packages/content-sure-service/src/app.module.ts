import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppRepo } from './app.repo';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppRepo],
})
export class AppModule {}

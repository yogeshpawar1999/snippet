import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ContentModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}

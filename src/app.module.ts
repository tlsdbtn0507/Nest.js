import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORM } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BoardsModule,
    AuthModule,
    TypeOrmModule.forRoot(typeORM),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath:'.env'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

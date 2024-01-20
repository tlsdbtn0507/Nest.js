import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { User } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import * as config from 'config'

// require('dotenv').config()

@Module({
  imports: [
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      //secret : Jwt해석에 쓰이는 키
      signOptions: {
        expiresIn: 60 * 60
        //expiresIn: Jwt유효기간 설정
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthRepository],
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule {}

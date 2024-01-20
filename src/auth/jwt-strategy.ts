import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthRepository } from "./auth.repository";
import { User } from "./auth.entity";
import * as config from 'config'

require('dotenv').config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(User)
    private userRepository: AuthRepository,
  ) { 
    super(
      {
        secretOrKey: process.env.JWT_SECRET_KEY || config.get('JWT_SECRET_KEY'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      })
     }
  async validate(payload) {
    const { userName } = payload;
    const user: User = await this.userRepository.findOne({ where: { userName } });
    
    if (!user) throw new UnauthorizedException();
    return user
  }
}
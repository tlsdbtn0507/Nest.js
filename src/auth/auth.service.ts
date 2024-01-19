import { Body, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './auth.entity';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
    private userRepositoy: AuthRepository,
    private jwtService : JwtService
  ) { }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userName, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hasedPw = await bcrypt.hash(password,salt)

    const user = this.userRepositoy.create({ userName, password:hasedPw})

    try {
      await this.userRepositoy.save(user);
      return user
    } catch (error) {
      if (error.code === '23505') throw new ConflictException('already exist id');
      else throw new InternalServerErrorException()
    }
  };

  async getAllUsers() : Promise<User[]> {
    return await this.userRepositoy.find()
  };

  async checkIdDuple(id: string) : Promise<boolean>{
    const user = await this.userRepositoy.findOne({ where: { userName: id } })
    return user === null ? false : true
  }

  async login(singinUserDto:CreateUserDto) : Promise<{accessToken:string}> {
    const { userName, password } = singinUserDto;
    const userCheck = await this.userRepositoy.findOne({ where: { userName } });
    const pwCheck = await bcrypt.compare(password, userCheck.password);
    
    // return console.log(userCheck, pwCheck);

    if (userCheck.userName && pwCheck) {
      const payload = { userName } //=>payload에 중요한 정보 x
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken }
    }
    else
      throw new UnauthorizedException('login failed')
  }
  
}

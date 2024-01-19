import { Body, ConflictException, Injectable, InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './auth.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor( @InjectRepository(User) private userRepositoy : AuthRepository) { }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userName, password } = createUserDto;

    const user = this.userRepositoy.create({ userName, password})

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
  
}

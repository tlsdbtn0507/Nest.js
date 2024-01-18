import { Body, Injectable, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepositoy : AuthRepository) { }
  
  async createUser(createUserDto:CreateUserDto) : Promise<User> {
    const { userName, password } = createUserDto;

    const user = this.userRepositoy.create({
      userName,
      password
    })

    await this.userRepositoy.save(user);
    return user
  };

  async getAllUsers() : Promise<User[]> {
    return await this.userRepositoy.find()
  }
  
}

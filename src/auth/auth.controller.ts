import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) { }
  
  @Get('/')
  getAllUser(): Promise<User[]>{
    return this.userService.getAllUsers();
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  createUser(createUserDto:CreateUserDto):Promise<User> {
    return this.userService.createUser(createUserDto)
  }

}

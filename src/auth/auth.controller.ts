import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './auth.entity';
import { DeleteResult } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) { }
  
  @Get('/')
  getAllUser(): Promise<User[]>{
    return this.userService.getAllUsers();
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  createUser( @Body() createUserDto:CreateUserDto):Promise<User> {
    return this.userService.createUser(createUserDto)
  }

  @Get('/idCheck/:id')
  checkIdduple(@Param('id') id:string) : Promise<boolean>{
    return this.userService.checkIdDuple(id)
  }

}

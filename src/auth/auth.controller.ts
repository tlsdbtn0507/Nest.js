import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './auth.entity';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/configs/get-user.decorater';

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

  @Post('/login')
  signIn(@Body() loginUserDto: CreateUserDto): Promise<{accessToken:string}>{
    return this.userService.login(loginUserDto)
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user:User) {
    console.log('user', user)
    // return 1
  }
}

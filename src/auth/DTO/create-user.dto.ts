import { Contains, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @Matches( /^[a-zA-Z!@#$%^&*(),.?":{}|<>]*$/, {
    message:'비밀번호는 4에서 10글자 사이에 영문,숫자,특수문자 포함해야합니다'
  })
  password:string
  
}
import { Contains, IsNotEmpty, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, {
    message:'비밀번호는 최소 4글자입니다'
  })
  @MaxLength(10, {
    message:'비밀번호는 최대 10글자 입니다'
  })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:'비밀번호는 영문,숫자와 특수문자 포함해야합니다'
  })
  password:string
  
}
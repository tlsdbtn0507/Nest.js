import { Repository } from "typeorm";
import { User } from "./auth.entity";
import { CreateUserDto } from "./DTO/create-user.dto";
import * as bcrypt from 'bcryptjs'
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

export class AuthRepository extends Repository<User>{
  async createUser(createUserDto:CreateUserDto ): Promise<User> {
        const { userName, password } = createUserDto;
    
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ userName, password: hashedPassword });
        
        try {
          await this.save(user);
          return user
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing userName');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }
}
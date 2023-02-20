import { BadRequestException, Body, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { scrypt as _scrypt } from "crypto";
import * as bcrypt from 'bcrypt';
import { SigninDto } from "./dto/signin.dto";

@Injectable()
export class AuthService{
    constructor(private userService: UserService){}

    async signup(@Body() body:CreateUserDto):Promise<CreateUserDto>{
            const users = await this.userService.find(body.email);
            if(users.length){
                throw new BadRequestException('email in use')
            }

            const salt = bcrypt.genSaltSync();

            const hash = bcrypt.hashSync(body.password , salt )

            const result = salt + '.' + hash.toString();

            const user = this.userService.create(body , result);

            return user
    }  
    
    async signin(@Body() body:SigninDto):Promise<SigninDto>{
        const [user] = await this.userService.find(body.userName)
        if(!user){
            throw new NotFoundException('User not found')
        }
        return 

    }
}
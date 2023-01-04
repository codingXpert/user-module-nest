import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private userService: UserService){}

    async signup(email:string , password:string):Promise<CreateUserDto>{
            const users = await this.userService.find(email);
            if(users.length){
                throw new BadRequestException('email in use')
            }

            const salt = randomBytes(8).toString('hex');

            const hash = (await scrypt(password, salt ,32)) as Buffer;

            const result = salt + '.' + hash.toString('hex');

            const user = this.userService.create(email , result);
            
            return user;
    }
}
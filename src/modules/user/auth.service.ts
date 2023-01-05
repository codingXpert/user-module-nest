import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
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
            
            return user
    }

    async signin(email:string , password:string){
        const [user] = await this.userService.find(email)
        if(!user){
            throw new NotFoundException('user not found')
        }

        const [salt , storedHash] = user.password.split('.');
        const hash = (await scrypt(password , salt , 32)) as Buffer;
        
        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('Wrong Password')
        }
        return user
    }
}
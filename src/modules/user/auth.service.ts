import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { SigninDto } from "./dto/signin.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signup(body: CreateUserDto) {
        const users = await this.userService.findByEmail(body.email);
        const userName = await this.userService.findByUserName(body.userName);

        if (users) {
            throw new BadRequestException('email in use');
        }
        if (userName) {
            throw new BadRequestException('user name in use')
        }

        const salt = bcrypt.genSaltSync();

        const hash = bcrypt.hashSync(body.password, salt);

        const user = this.userService.create(body, hash);

        return user
    }

    async signin(body: SigninDto): Promise<{}> {
        const user = await this.userService.findByUserName(body.userName);

        if (!user) {
            throw new NotFoundException('Sorry :) User Not Found')
        }
        const isMatch = await bcrypt.compare(body.password, user.password);

        if (!isMatch) {
            throw new BadRequestException("invalid user name or password");
        } else {
            const payload = { username: user.userName, userId: user.id , email:user.email };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
    }
}
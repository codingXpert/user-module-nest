import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { SigninDto } from '../user/dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from '../user/dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signup(body: CreateUserDto) {
    const users = await this.userService.findByEmail(body.email);
    const userName = await this.userService.findByUserName(body.userName);

    if (users) {
      throw new BadRequestException('email in use');
    }
    if (userName) {
      throw new BadRequestException('user name in use');
    }

    const salt = bcrypt.genSaltSync();

    const hash = bcrypt.hashSync(body.password, salt);

    const user = this.userService.create(body, hash);

    return user;
  }

  async signin(body: SigninDto): Promise<{}> {
    const user = await this.userService.findByUserName(body.userName);

    if (!user) {
      throw new NotFoundException('Sorry :) User Not Found');
    }
    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('invalid user name or password');
    } else {
      const payload = {
        username: user.userName,
        userId: user.id
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

  //Change password after signin
  async changePassword(userId: number, body: ChangePasswordDto) {
    const user = await this.userService.findOne(userId);

    if (user) {
      const isMatch = await bcrypt.compare(body.oldPassword, user.password);
      
      if (isMatch) {
        const salt = await bcrypt.genSaltSync();
        const hashPassword = await bcrypt.hash(body.newPassword, salt);
        const updatePassword = await this.userService.updatePassword(userId, hashPassword);

        if (updatePassword) {
          return true
        } else {
          throw new HttpException('Error While resetting password', HttpStatus.BAD_REQUEST)
        }
      } else {
        throw new HttpException('You Entered a wrong password', HttpStatus.BAD_REQUEST)
      }
    }
  }
}
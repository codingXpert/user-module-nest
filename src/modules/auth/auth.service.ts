import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { SigninDto } from '../user/dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from '../user/dto/change-password.dto';
import { ForgetPasswordDto } from '../user/dto/forget-password.dto';
import appConfig from 'src/secretConfig/app.config';
import { ResetPasswordDto } from '../user/dto/reset-password.dto';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AuthService {
  jwt = require('jsonwebtoken')
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailerService: MailerService
  ) { }

  // Sign-Up
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

  // Sign-In
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
  async changePassword(userId: number, body: ChangePasswordDto):Promise<Boolean> {
    const user = await this.userService.findOne(userId);

    if (user) {
      const isMatch = await bcrypt.compare(body.oldPassword, user.password);

      if (isMatch) {
        const salt = await bcrypt.genSaltSync();
        const hashPassword = await bcrypt.hash(body.newPassword, salt);
        const updatePassword = await this.userService.updatePassword(hashPassword);

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

  // Forget Password
  async forgetPassword(body: ForgetPasswordDto):Promise<CreateUserDto> {
    const user = await this.userService.findByEmail(body.email);
    if (!user) {
      throw new NotFoundException('User Not Registred');
    }
    const secret = appConfig().appSecret + user.password;
    const payload = {
      id: user.id,
      email: user.email
    }
    const token = this.jwt.sign(payload, secret, { expiresIn: '1d' })
    const link = `http://localhost:3000/auth/resetPassword/${user.id}/${token}`;
    // sending mail to the user
    await this.mailerService.sendMail({
      to:user.email,
      subject:'Password Reset Link',
      html:`Click <a href = "${link}"> here </a> reset your password`
  })
    console.log(link);
    return user;
  }
//reset forget password
  async setPassword(body: ResetPasswordDto):Promise<string> {
    if (body.password === body.conformPassword) {
      const salt = await bcrypt.genSaltSync();
      const hashPassword = await bcrypt.hash(body.password, salt);
      const updatePassword = await this.userService.updatePassword(hashPassword);

      if (updatePassword) {
        return 'Password Updated Successfully!!'
      } else {
        throw new HttpException('Error While Updating Password', HttpStatus.BAD_REQUEST)
      }
    } else {
      throw new HttpException('Password Not Matched', HttpStatus.BAD_REQUEST)
    }
  }
}


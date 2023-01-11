import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Res,
  HttpStatus
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';
import express, { Response} from 'express';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  @Post('/signup')
  create(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.signup(body);
  }

  @Post('/signin')
  async signinDto(@Body() body: SigninDto): Promise<{}> {
    const user = await this.authService.signin(body);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  @UseGuards(JwtAuthGuard)
  @Post('reset')
  async reset(
    @Request() req,   // access to the current logedIn token
    @Res() res: Response,
    @Body() resetPasswordDto: ResetPasswordDto
  ) {
    const data = await this.authService.resetPassword(req.user.userId, resetPasswordDto)
    
    res.status(HttpStatus.OK).send({
      success: HttpStatus.OK,
      data,
      message: "Password reset successfully",
    });
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

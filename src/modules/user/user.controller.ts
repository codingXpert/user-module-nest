import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

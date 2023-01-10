import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service'; 
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/secretConfig/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig)
  ],
  controllers: [UserController],
  providers: [UserService, AuthService ]  ,
})
export class UserModule { }

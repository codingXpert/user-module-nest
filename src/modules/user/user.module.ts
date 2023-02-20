import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service'; 
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/secretConfig/jwt.config';
import { AuthController } from '../auth/auth.controller';
import { Mailer } from '../mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig), 
  ],
  controllers: [UserController , AuthController],
  providers: [UserService, AuthService ]  ,
})
export class UserModule { }

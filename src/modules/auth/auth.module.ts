import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConfig } from 'src/secretConfig/jwt.config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    // JwtModule.registerAsync(jwtConfig),
  ],
  providers: [AuthService , JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
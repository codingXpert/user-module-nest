// import { Module } from "@nestjs/common";
// import { PassportModule } from "@nestjs/passport";
// import { AuthService } from "./auth.service";
// import { UserModule } from "../user/user.module";
// import { UserService } from "../user/user.service";
// import { JwtModule, JwtService } from "@nestjs/jwt";
// import { UserController } from "../user/user.controller";
// @Module({
//     imports: [UserModule, PassportModule, JwtModule.register({
//         secret: 'secret',
//         signOptions: { expiresIn: '1h' },
//     }),],
//     providers: [AuthService],
//     controllers: [UserController],
// })

// export class AuthModule { }




import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

import { JwtStrategy } from './strategies/jwt.strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRECT_KEY,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [UserController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }
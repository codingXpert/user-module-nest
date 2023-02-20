import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './database/databse-connection.service';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { jwtConfig } from './secretConfig/jwt.config';
import { Mailer } from './modules/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
    JwtModule.registerAsync(jwtConfig),
    UserModule,Mailer
  ],
  controllers: [AppController],
  providers: [AppService , JwtStrategy],
})
export class AppModule { }

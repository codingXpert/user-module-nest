import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './database/databse-connection.service';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './modules/auth/auth.constants';
import { JwtStrategy } from './modules/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
    JwtModule.register({
      secret: jwtConstants.secret,    // this is ok for now , but secret should come from .env
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService , JwtStrategy],
})
export class AppModule { }

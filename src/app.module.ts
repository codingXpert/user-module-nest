import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './database/databse-connection.service';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
    JwtModule.register({
      secret: process.env.SECRECT_KEY,    // this is ok for now , but secret should come from .env
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule { }

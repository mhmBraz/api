import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {UsersModule} from 'src/modules/users/users.module';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
require('dotenv').config();

@Module({
  imports: [
    PassportModule,
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthModule {}

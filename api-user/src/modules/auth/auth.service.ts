import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {GetUserService} from 'src/modules/users/services/';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import {GetUserDto, UserDto} from 'src/modules/users/dtos/sub-dtos';
import {PayloadDto} from './dtos';
import {LoginResponseDto} from '../login/dtos/res';
import {I18nContext} from 'nestjs-i18n';
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: GetUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<UserDto, 'password'> | null> {
    const user: GetUserDto | null = await this.usersService.handlerByLogin(
      username,
    );

    if (user && (await bcrypt.compare(pass, user.password))) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto): Promise<LoginResponseDto> {
    const i18n = I18nContext.current();

    const payload: PayloadDto = {
      username: user.login,
      sub: user._id,
      roles: user.roles,
    };

    return {
      token: await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
      status: true,
      message: await i18n.t('login.success'),
    };
  }
}

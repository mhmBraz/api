import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserDto} from 'src/modules/users/dtos/sub-dtos';
import {I18nContext} from 'nestjs-i18n';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<UserDto, 'password'>> {
    const i18n = I18nContext.current();

    const user: Omit<UserDto, 'password'> = await this.authService.validateUser(
      username,
      password,
    );

    if (!user) {
      throw new HttpException(
        await i18n.t('login.failed'),
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}

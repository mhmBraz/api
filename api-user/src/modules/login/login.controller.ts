import {Body, Controller, Param, Post, UseGuards} from '@nestjs/common';
import {I18n, I18nContext} from 'nestjs-i18n';
import {AuthService} from 'src/modules/auth/auth.service';
import {LocalAuthGuard} from 'src/modules/auth/local-auth.guard';
import {User} from '../decorators/user.decorator';
import {UserDto} from '../users/dtos/sub-dtos';
import {ChangePasswordDto} from './dtos/req';
import {recoverUserDto} from './dtos/req/';
import {LoginResponseDto} from './dtos/res';
import {changePasswordService, recoverUserService} from './services/';

@Controller()
export class LoginController {
  constructor(
    private authService: AuthService,
    private recoverUserService: recoverUserService,
    private changePasswordService: changePasswordService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@User() user: UserDto): Promise<LoginResponseDto> {
    return await this.authService.login(user);
  }

  @Post('/recoverUser')
  async recoverUser(
    @Body() req: recoverUserDto,
  ): Promise<{status: boolean; message: string}> {
    return this.recoverUserService.handler(req);
  }

  @Post('/recoverPassword/:email')
  async recoverPassword(
    @Param('email') email: string,
    @Body() req: ChangePasswordDto,
  ): Promise<{status: boolean; message: string}> {
    return this.changePasswordService.handler({
      email: email,
      code: req.code,
      password: req.password,
    });
  }
}

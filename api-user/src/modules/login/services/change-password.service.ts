import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {I18nContext} from 'nestjs-i18n';
import {
  GetUserService,
  RecoverPasswordService,
} from 'src/modules/users/services/';
import {ChangePasswordDto} from '../dtos/req';
import * as moment from 'moment';

@Injectable()
export class changePasswordService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly recoverPasswordService: RecoverPasswordService,
  ) {}

  public async handler(
    payload: ChangePasswordDto,
  ): Promise<{status: boolean; message: string}> {
    const i18n = I18nContext.current();
    const crypto = require('crypto');
    let decryptedData = '';
    let message = '';

    const decipher = crypto.createDecipheriv(
      process.env.ALGORITHM_EMAIL,
      process.env.SECURITY_KEY_EMAIL,
      process.env.SECURITY_START_KEY_EMAIL,
    );

    try {
      decryptedData = decipher.update(payload.email, 'hex', 'utf-8');
    } catch (error) {
      throw new HttpException(
        await i18n.t('generic.error'),
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.getUserService.handlerByEmail(decryptedData);

    const dateCurrent = moment().format('YYYY-MM-DD h:mm:ss').valueOf();
    const dateUser = user.expirationCodPassword.valueOf();

    if (user && user.codPassword === payload.code && dateUser > dateCurrent) {
      this.recoverPasswordService.handler(user._id, payload.password);
      message = await i18n.t('login.recover-user');
    } else if (
      user &&
      (user.codPassword !== payload.code || dateUser < dateCurrent)
    ) {
      message = await i18n.t('login.change-password');
    } else {
      message = await i18n.t('generic.error');
    }

    return {
      status: true,
      message: message,
    };
  }
}

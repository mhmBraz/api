import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {I18nContext} from 'nestjs-i18n';
import {recoverUserDto} from '../dtos/req/';
import {
  GetUserService,
  saveRecoverCodeService,
} from 'src/modules/users/services/';
import * as mail from '../../../send-email';

@Injectable()
export class recoverUserService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly saveRecoverCodeService: saveRecoverCodeService,
  ) {}

  public async handler(
    payload: recoverUserDto,
  ): Promise<{status: boolean; message: string}> {
    const i18n = I18nContext.current();
    const subject = 'Lavame: recuperação de senha!';
    const title = 'Recuperação de senha';

    let user = await this.getUserService.handlerByEmail(payload.email);
    let emailBcrypt: string = '';
    let link: string = process.env.APP_HOST + 'recoverPassword/';
    let codRandom: string;

    if (user) {
      const crypto = require('crypto');

      try {
        const cipher = crypto.createCipheriv(
          process.env.ALGORITHM_EMAIL,
          process.env.SECURITY_KEY_EMAIL,
          process.env.SECURITY_START_KEY_EMAIL,
        );

        emailBcrypt = cipher.update(user.email, 'utf-8', 'hex');
        emailBcrypt += cipher.final('hex');

        codRandom = await this.saveRecoverCodeService.handler(user._id);
      } catch (err) {
        throw new HttpException(
          await i18n.t('generic.error'),
          HttpStatus.FORBIDDEN,
        );
      }
    }
    user = null;
    link += emailBcrypt;

    const owner_html = await mail.mountHTML(
      {
        title,
        description: 'codigo: ' + codRandom + ' link: ' + link,
      },
      'sendCodRemember.ejs',
    );

    mail.sendEmail('lavame.bh@gmail.com', subject, owner_html);

    return {
      status: true,
      message: await i18n.t('login.recover-user'),
    };
  }
}

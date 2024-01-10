import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {CreateUserRequestDto} from '../dtos/req';
import {UserRepository} from '../repositories';
import * as bcrypt from 'bcrypt';
import {I18nContext} from 'nestjs-i18n';
import {RmqService} from './rmq.service';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RmqService,
  ) {}

  public async handler(
    payload: CreateUserRequestDto,
  ): Promise<{message: string; success: boolean}> {
    const i18n = I18nContext.current();

    const user = await this.userRepository.findExistentUser({
      email: payload.email,
      login: payload.login,
      cpf: payload.cpf,
    });

    if (user.length) {
      throw new HttpException(
        await i18n.t('user.error-create-user'),
        HttpStatus.FORBIDDEN,
      );
    }

    try {
      payload.password = await bcrypt.hash(payload.password, 3);
    } catch (err) {
      throw new InternalServerErrorException(); // Falha ao gerar o hash
    }

    try {
      this.userRepository.create(payload);
      this.rmqService.sendEmail(payload);

      return {
        message: await i18n.t('generic.success'),
        success: true,
      };
    } catch (err) {
      throw new BadGatewayException(); // Falha ao chamar o banco
    }
  }
}

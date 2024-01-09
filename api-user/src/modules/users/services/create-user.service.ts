import {
  BadGatewayException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {CreateUserRequestDto} from '../dtos/req';
import {UserRepository} from '../repositories';
import {CreateUserResponseDto} from '../dtos/res';
import * as bcrypt from 'bcrypt';
import {I18nContext} from 'nestjs-i18n';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async handler(
    payload: CreateUserRequestDto,
  ): Promise<{message: string; success: boolean; data: CreateUserResponseDto}> {
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
      const created = await this.userRepository.create(payload);
      return {
        data: new CreateUserResponseDto(created),
        message: await i18n.t('user.error-create-user'),
        success: true,
      };
    } catch (err) {
      throw new BadGatewayException(); // Falha ao chamar o banco
    }
  }
}

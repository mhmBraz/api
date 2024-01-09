import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {UserRepository} from '../repositories';
import {GetUserDto, UserDto} from '../dtos/sub-dtos';
import {PayloadDto} from 'src/modules/auth/dtos';
import {I18nContext} from 'nestjs-i18n';
import {GetUserResponseDto} from '../dtos/res/get-user.dto';

@Injectable()
export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async handlerById(
    reqUserId: string,
    userToken: PayloadDto,
  ): Promise<GetUserResponseDto> {
    const i18n = I18nContext.current();
    const user: UserDto = await this.userRepository.userById(reqUserId);

    if (
      user &&
      user._id.toString() !== userToken.sub &&
      !userToken.roles.includes('ADMIN')
    ) {
      throw new HttpException(
        await i18n.t('generic.permission'),
        HttpStatus.FORBIDDEN,
      );
    }

    return {
      message: '',
      success: true,
      data: new GetUserDto(user).deletePassword().deleteUpdatedAt(),
    };
  }

  public async handlerByLogin(login: string): Promise<GetUserDto> {
    try {
      const user: UserDto = await this.userRepository.userByLogin(login);

      return user ? new GetUserDto(user) : null;
    } catch (err) {
      throw new BadGatewayException(); // Falha ao chamar o banco
    }
  }

  public async handlerByEmail(email: string): Promise<GetUserDto> {
    try {
      const user: UserDto = await this.userRepository.userByEmail(email);

      return user ? new GetUserDto(user).deleteCars() : null;
    } catch (err) {
      throw new BadGatewayException(); // Falha ao chamar o banco
    }
  }
}

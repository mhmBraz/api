import {BadGatewayException, Injectable} from '@nestjs/common';
import {UserRepository} from '../repositories';

// import {GetUserResponseDto} from '../dtos/res';

@Injectable()
export class RecoverPasswordService {
  constructor(private readonly userRepository: UserRepository) {}

  public async handler(userId: string, password: string) {
    try {
      this.userRepository.recoverPassword(userId, password);
    } catch (err) {
      throw new BadGatewayException(); // Falha ao chamar o banco
    }
  }
}

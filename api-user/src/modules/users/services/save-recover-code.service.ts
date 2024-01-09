import {BadGatewayException, Injectable} from '@nestjs/common';
import {UserRepository} from '../repositories';
import * as moment from 'moment';

@Injectable()
export class saveRecoverCodeService {
  constructor(private readonly userRepository: UserRepository) {}

  public async handler(userId: string) {
    try {
      const codRandom: string = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();

      this.userRepository.addRecoverCode(
        userId,
        codRandom,
        moment().add(30, 'minutes').format('YYYY-MM-DD h:mm:ss'),
      );

      return codRandom;
    } catch (err) {
      throw new BadGatewayException(); // Falha ao chamar o banco
    }
  }
}

import {BadGatewayException, Inject, Injectable} from '@nestjs/common';
import {UserRepository} from '../repositories';
import {ClientProxy} from '@nestjs/microservices';

// import {GetUserResponseDto} from '../dtos/res';

@Injectable()
export class RmqService {
  constructor(
    @Inject('USERS_EMAILS_SERVICE') private clientEmail: ClientProxy,
  ) {}
  public async sendEmail(userId: string) {
    try {
      this.clientEmail.emit('users_emails', {
        id: userId,
        data: {
          userId: userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

import {Inject, Injectable} from '@nestjs/common';

import {ClientProxy} from '@nestjs/microservices';
import {CreateUserRequestDto} from '../dtos/req';

@Injectable()
export class RmqService {
  constructor(
    @Inject('USERS_EMAILS_SERVICE') private clientEmail: ClientProxy,
  ) {}
  public async sendEmail(user: CreateUserRequestDto) {
    try {
      this.clientEmail.emit('users_emails', {
        email: user.email,
        data: {
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

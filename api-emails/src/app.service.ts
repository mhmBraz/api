import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: any) {
    console.log('handlerUserCreated - COMMUNICATIONS', data);
    // TODO: Email the user...
  }
}

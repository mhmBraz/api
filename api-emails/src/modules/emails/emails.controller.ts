import { Controller, Get } from '@nestjs/common';

import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class EmailsController {
  constructor() {}

  @MessagePattern('users_emails')
  async createUser(@Payload() data, @Ctx() context: RmqContext) {
    try {
      console.log('data: ', data);
      console.log(`data: ${JSON.stringify(data)}`);

      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();

      channel.ack(originalMsg);
      return data;
    } catch (error) {
      console.log(`Error > showCat error: ${error}`);
    }
  }
}

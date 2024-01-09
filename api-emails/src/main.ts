import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log(process.env.APP_PORT);
  const app = await NestFactory.create(AppModule);

  const queues = ['users_emails'];

  for (const queue of queues) {
    await app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue: queue,
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();

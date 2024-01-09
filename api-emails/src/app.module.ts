import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailsModule } from './modules/emails/emails.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmailsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

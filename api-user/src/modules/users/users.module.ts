import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {
  CreateUserService,
  RecoverPasswordService,
  saveRecoverCodeService,
} from './services';
import {User, UserSchema} from './entities';
import {MongooseModule} from '@nestjs/mongoose';
import {UserRepository} from './repositories';
import {AddCarToUserService} from './services/';
import {GetUserService} from './services/';
import {AuthModule} from 'src/modules/auth/auth.module';
import {UpdateRememberService} from './services/';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {RmqService} from './services/rmq.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    forwardRef(() => AuthModule),
    ClientsModule.register([
      {
        name: 'USERS_EMAILS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'users_emails',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UserRepository,
    CreateUserService,
    AddCarToUserService,
    GetUserService,
    UpdateRememberService,
    saveRecoverCodeService,
    RecoverPasswordService,
    RmqService,
  ],
  exports: [
    GetUserService,
    UpdateRememberService,
    saveRecoverCodeService,
    RecoverPasswordService,
  ],
})
export class UsersModule {}

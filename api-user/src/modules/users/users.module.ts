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

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    forwardRef(() => AuthModule),
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
  ],
  exports: [
    GetUserService,
    UpdateRememberService,
    saveRecoverCodeService,
    RecoverPasswordService,
  ],
})
export class UsersModule {}

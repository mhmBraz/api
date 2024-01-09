import {Module} from '@nestjs/common';
import {User, UserSchema} from '../users/entities';
import {MongooseModule} from '@nestjs/mongoose';
import {LoginController} from './login.controller';
import {AuthModule} from 'src/modules/auth/auth.module';
import {UsersModule} from '../users/users.module';
import {changePasswordService, recoverUserService} from './services/';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    AuthModule,
    UsersModule,
  ],
  controllers: [LoginController],
  providers: [recoverUserService, changePasswordService],
})
export class LoginModule {}

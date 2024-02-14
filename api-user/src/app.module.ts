import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AcceptLanguageResolver, I18nModule, QueryResolver} from 'nestjs-i18n';
import * as path from 'path';
import {LoginModule} from './modules/login/login.module';
import {UsersModule} from './modules/users/users.module';
import {PassportModule} from '@nestjs/passport';
import {AuthModule} from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.APP_MONGODB_URI, {
      dbName: process.env.APP_MONGODB_DATABASE,
    }),
    UsersModule,
    LoginModule,
    PassportModule,
    I18nModule.forRoot({
      fallbackLanguage: 'pt',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        {use: QueryResolver, options: ['lang']},
        AcceptLanguageResolver,
      ],
    }),
    AuthModule,
  ],
})
export class AppModule {}

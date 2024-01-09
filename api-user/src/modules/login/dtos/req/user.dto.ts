import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
export class userDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  i18n;
}

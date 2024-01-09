import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
export class recoverUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}

import {IsNotEmpty, IsString} from 'class-validator';
export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  token?;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  constructor(args: LoginDto) {
    Object.assign(this, args);
  }
}

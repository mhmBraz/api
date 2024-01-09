import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class EditUserRequestDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsString()
  sex: string;

  @IsString()
  name: string;

  @IsString()
  birthDate: Date;

  @IsString()
  cnh: string;

  @IsString()
  phone: string;
}

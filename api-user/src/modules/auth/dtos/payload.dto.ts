import {IsArray, IsNotEmpty, IsString} from 'class-validator';
export class PayloadDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  sub: string;

  @IsArray()
  @IsNotEmpty()
  roles: string[];
}

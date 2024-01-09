import {IsNotEmpty, IsString} from 'class-validator';

export class GenericLoginResponseDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  status: boolean;
}

import {IsNotEmpty, IsString} from 'class-validator';

export class GenericUserResponseDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  status: boolean;
}

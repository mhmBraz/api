import {IsNotEmpty, IsString} from 'class-validator';
import {UserDto} from '../sub-dtos';

export class GetUserResponseDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  success: boolean;

  data: UserDto;
}

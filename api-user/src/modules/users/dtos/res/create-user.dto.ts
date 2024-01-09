import {UserDto} from '../sub-dtos';

export class CreateUserResponseDto extends UserDto {
  constructor(args: CreateUserResponseDto) {
    delete args.password;
    super(args);
  }
}

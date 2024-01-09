import {LoginDto} from '../sub-dtos';

export class LoginResponseDto extends LoginDto {
  constructor(args: LoginResponseDto) {
    super(args);
    return Object.assign(this, args);
  }
}

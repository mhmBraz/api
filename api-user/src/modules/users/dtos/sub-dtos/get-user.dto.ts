import {UserDto} from '../sub-dtos';

export class GetUserDto extends UserDto {
  constructor(args: UserDto) {
    super(args);
  }

  public deletePassword() {
    delete this.password;
    return this;
  }

  public deleteCars() {
    delete this.cars;
    return this;
  }

  public deleteCreatedAt() {
    delete this.createdAt;
    return this;
  }

  public deleteUpdatedAt() {
    delete this.updatedAt;
    return this;
  }
}

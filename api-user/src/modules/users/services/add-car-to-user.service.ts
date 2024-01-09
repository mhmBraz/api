import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import {AddCarToUserRequestDto} from '../dtos/req';
import {UserRepository} from '../repositories';
import {AddCarToUserResponseDto} from '../dtos/res';
import {isMongoId} from 'class-validator';
import {Types} from 'mongoose';

@Injectable()
export class AddCarToUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async handler(
    userId: string,
    payload: AddCarToUserRequestDto,
  ): Promise<AddCarToUserResponseDto> {
    if (!isMongoId(userId)) throw new BadRequestException();

    try {
      payload._id = new Types.ObjectId();
      await this.userRepository.addCar(userId, payload);
      return new AddCarToUserResponseDto(payload);
    } catch (err) {
      throw new BadGatewayException(); // Falha ao chamar o banco
    }
  }
}

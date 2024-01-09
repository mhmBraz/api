import {IsMongoId, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {Types} from 'mongoose';

export class CarDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  _id: string | Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  plate: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  constructor(args: CarDto) {
    Object.assign(this, args);
  }
}

import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument} from '../entities';
import {CreateUserRequestDto} from '../dtos/req';
import {Model} from 'mongoose';
import {CarDto} from '../dtos/sub-dtos';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async findExistentUser(
    filters: Pick<User, 'email' | 'login' | 'cpf'>,
  ) {
    return this.userModel
      .find({
        $or: [
          {email: filters.email},
          {cpf: filters.cpf},
          {login: filters.login},
        ],
      })
      .exec();
  }

  public async userById(_id: string) {
    const document = await this.userModel.findOne({_id: _id});
    return document ? document.toJSON() : null;
  }

  public async userByLogin(login: string) {
    const document = await this.userModel.findOne({login: login});
    return document ? document.toJSON() : null;
  }

  public async userByEmail(email: string) {
    const document = await this.userModel.findOne({email: email});
    return document ? document.toJSON() : null;
  }

  public async create(payload: CreateUserRequestDto) {
    const document = await this.userModel.create(payload);
    return document ? document.toJSON() : null;
  }

  public async addRecoverCode(
    _id: string,
    codPassword: string,
    expiration: string,
  ) {
    return this.userModel
      .findByIdAndUpdate(
        {_id},
        {
          $set: {
            codPassword: codPassword,
            expirationCodPassword: expiration,
          },
        },
      )
      .exec();
  }

  public async addCar(_id: string, car: CarDto) {
    return this.userModel
      .findByIdAndUpdate({_id}, {$push: {cars: car}}, {new: true, lean: true})
      .exec();
  }

  public async recoverPassword(_id: string, password: string) {
    return this.userModel
      .findByIdAndUpdate(
        {_id},
        {
          $set: {
            password: password,
          },
        },
      )
      .exec();
  }
}

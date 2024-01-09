import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {CreateUserService} from './services';
import {CreateUserRequestDto} from './dtos/req';
import {CreateUserResponseDto, GetUserResponseDto} from './dtos/res';
import {GetUserService} from './services/';
import {AuthGuard} from 'src/modules/auth/auth.guard';
import {User} from '../decorators/user.decorator';
import {PayloadDto} from '../auth/dtos';
import {isMongoId} from 'class-validator';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
  ) {}

  @Get(':userId')
  @UseGuards(AuthGuard)
  public async user(
    @Param('userId') userId: string,
    @User() user: PayloadDto,
  ): Promise<GetUserResponseDto> {
    if (!isMongoId(userId)) throw new BadRequestException();

    return await this.getUserService.handlerById(userId, user);
  }

  @Post('/create')
  public async createUser(
    @Body() payload: CreateUserRequestDto,
  ): Promise<{message: string; success: boolean; data: CreateUserResponseDto}> {
    return this.createUserService.handler(payload);
  }

  //parei aqui
  // @Put(':userId/edit')
  // public async addCarToUser(
  //   @Param('userId') userId: string,
  //   @Body() payload: EditUserRequestDto,
  // ): Promise<GenericUserResponseDto> {
  //   return {
  //     message: '',
  //     status: true,
  //   };
  // }

  // @Put(':userId/cars')
  // public async addCarToUser(
  //   @Param('userId') userId: string,
  //   @Body() payload: AddCarToUserRequestDto,
  // ): Promise<AddCarToUserResponseDto> {
  //   return this.addCarToUserService.handler(userId, payload);
  // }
}

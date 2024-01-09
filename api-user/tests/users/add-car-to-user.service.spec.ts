import {mock} from 'jest-mock-extended';
import {UserRepository} from '../../src/modules/users/repositories';
import {CreateUserService} from '../../src/modules/users/services';
import {User} from '../../src/modules/users/entities';
import {ConflictException} from '@nestjs/common';

let userRepository: UserRepository;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeAll(() => {
    userRepository = mock<UserRepository>({
      findExistentUser: jest.fn(),
    });
    createUserService = new CreateUserService(userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('handler', () => {
    it('should throw a conflict exception when a user already exists', async () => {
      // prettier-ignore
      const mockedRequest = {login: 'A', password: 'B', email: 'C@C.com', cars: []};
      const mockedResponse = [{}] as User[];
      userRepository.findExistentUser = jest
        .fn()
        .mockResolvedValueOnce(mockedResponse);

      let error: unknown;
      try {
        await createUserService.handler(mockedRequest);
      } catch (err) {
        error = err;
        expect(err).toBeDefined();
        expect(err instanceof ConflictException).toBeTruthy();
      }
      expect(error).toBeDefined();
    });
  });
});

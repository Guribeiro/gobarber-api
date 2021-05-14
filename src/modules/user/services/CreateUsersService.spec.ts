import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUsersService from './CreateUsersService';
import FakeUsersRepository from '../infra/repositories/fakes/FakeUsersRepository';
import HashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let createUsersService: CreateUsersService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: HashProvider;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUsersService = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUsersService.execute({
      name: 'gustavo',
      email: 'gustavo@hotmail.com',
      password: '1234567',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'gustavo',
      email: 'gustavo@hotmail.com',
      password: '1234567',
    });

    await expect(
      createUsersService.execute({
        name: 'gustavo2',
        email: user.email,
        password: '12345687',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

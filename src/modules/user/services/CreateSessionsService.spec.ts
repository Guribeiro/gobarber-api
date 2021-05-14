import AppError from '@shared/errors/AppError';
import CreateSessionsService from './CreateSessionsService';
import FakeUsersRepository from '../infra/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSessionsService: CreateSessionsService;

describe('CreateSessions', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createSessionsService = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to start a new session', async () => {
    const user = await fakeUsersRepository.create({
      name: 'gustavo',
      email: 'gustavo@hotmail.com',
      password: '1234567',
    });

    const response = await createSessionsService.execute({
      email: 'gustavo@hotmail.com',
      password: '1234567',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'gustavo',
      email: 'gustavo@hotmail.com',
      password: '12345678',
    });

    await expect(
      createSessionsService.execute({
        email: 'gustavo@hotmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong email', async () => {
    await fakeUsersRepository.create({
      name: 'gustavo',
      email: 'gustavo@hotmail.com',
      password: '12345678',
    });

    await expect(
      createSessionsService.execute({
        email: 'wrong-email',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

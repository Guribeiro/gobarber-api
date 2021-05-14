import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../infra/repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../infra/repositories/fakes/FakeUsersTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let resetPasswordService: ResetPasswordService;
let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersTokenRepository = new FakeUserTokenRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUsersTokenRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345678',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with invalid user id', async () => {
    const { token } = await fakeUsersTokenRepository.generate('invalid-id');

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the password in 2 hours since the last reset', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345678',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

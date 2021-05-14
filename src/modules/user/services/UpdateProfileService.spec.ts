import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../infra/repositories/fakes/FakeUsersRepository';

let updateProfileService: UpdateProfileService;
let fakeUsersRepository: FakeUsersRepository;

let fakeHashProvider: FakeHashProvider;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'gustavo',
      email: 'gustavo@gmail.com',
      password: '1234567',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'gustavo Henrique',
      email: 'gustavo@hotmail.com',
    });

    expect(updatedUser?.name).toBe('gustavo Henrique');
    expect(updatedUser?.email).toBe('gustavo@hotmail.com');
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@gmail.com',
      password: '12345678',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com.br',
      old_password: '12345678',
      password: '40028922',
    });

    expect(updatedUser.password).toBe('40028922');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@gmail.com',
      password: '12345678',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'john@tre.com.br',
        password: '40028922',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@gmail.com',
      password: '12345678',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'john@tre.com.br',
        old_password: 'wrong-old-password',
        password: '40028922',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the email to a another user address email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '1234567',
    });

    const user = await fakeUsersRepository.create({
      name: 'gustavo',
      email: 'gustavo@gmail.com',
      password: '1234567',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile from a non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user',
        name: 'gustavo Henrique',
        email: 'gustavo@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../infra/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('SendEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '12345678',
    });

    const profile = await showProfileService.execute({
      id: user.id,
    });

    expect(profile?.name).toBe('John Doe');
    expect(profile?.email).toBe('john@gmail.com');
  });

  it('should not be able to show a non-existing profile', async () => {
    expect(
      showProfileService.execute({
        id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

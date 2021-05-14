import FakeEmailProvider from '@shared/container/providers/EmailProvider/fakes/FakeEmailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersTokenRepository from '@modules/user/infra/repositories/fakes/FakeUsersTokenRepository';
import SendForgotEmailService from './SendForgotEmailService';
import FakeUsersRepository from '../infra/repositories/fakes/FakeUsersRepository';

let sendForgotEmailService: SendForgotEmailService;
let fakeEmailProvider: FakeEmailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;

describe('SendForgotEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeEmailProvider = new FakeEmailProvider();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();

    sendForgotEmailService = new SendForgotEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
      fakeUsersTokenRepository,
    );
  });
  it('should be able to send an email', async () => {
    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');

    await fakeUsersRepository.create({
      name: 'gustavo',
      email: 'gustavo@hotmail.com',
      password: '1234567',
    });

    await sendForgotEmailService.execute({
      email: 'gustavo@hotmail.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });
  it('should not be able to send a recover password email to a non-existing user ', async () => {
    await expect(
      sendForgotEmailService.execute({
        email: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new password recover user token', async () => {
    const generate = jest.spyOn(fakeUsersTokenRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'gustavo',
      email: 'gustavo@gmail.com',
      password: '1234567',
    });

    await fakeUsersTokenRepository.generate(user.id);

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});

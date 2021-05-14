import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import path from 'path';
import IUsersRepository from '../infra/repositories/IUsersRepository';
import IUsersTokenRepository from '../infra/repositories/IUsersTokenRepository';

interface Request {
  email: string;
}
@injectable()
export default class SendForgotEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IEmailProvider,

    @inject('UsersTokenRepository')
    private usersTokenProvider: IUsersTokenRepository,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('user not found');
    }

    const { token } = await this.usersTokenProvider.generate(user.id);

    const forgotEmailPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Gobarber] Recuperação de senha',
      templateData: {
        file: forgotEmailPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

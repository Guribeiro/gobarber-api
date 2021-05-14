import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../infra/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface Request {
  id: string;
}
@injectable()
export default class SendForgotEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: Request): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('user not found');
    }

    return user;
  }
}

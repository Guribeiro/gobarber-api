import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import User from '@modules/user/infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../infra/repositories/IUsersRepository';
import IUsersTokenRepository from '../infra/repositories/IUsersTokenRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  token: string;
  password: string;
}
@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
  ) {}

  public async execute({ token, password }: Request): Promise<User> {
    const userToken = await this.usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('user token does not exist');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('user not found');
    }

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }

    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);

    return user;
  }
}

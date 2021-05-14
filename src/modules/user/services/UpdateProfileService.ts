import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import User from '@modules/user/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../infra/repositories/IUsersRepository';

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

interface IUpdateUserFields {
  name: string;
  email: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user does not found');
    }

    const findUserWithSameEmail = await this.usersRepository.findByEmail(email);

    if (findUserWithSameEmail && findUserWithSameEmail.id !== user_id) {
      throw new AppError('email address is already been used');
    }

    Object.assign<User, IUpdateUserFields>(user, {
      name,
      email,
    });

    if (password && !old_password) {
      throw new AppError(
        'you need to inform the old password before you create a new one',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

import User from '@modules/user/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import { v4 } from 'uuid';
import IUsersRepository from '../IUsersRepository';

import IFindProvidersDTO from '../../../dtos/IFindProvidersDTO';

interface ICreateUserFakeDTO {
  id: string;
  name: string;
  email: string;
  password: string;
}

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindProvidersDTO): Promise<User[]> {
    const users = this.users.filter(user => user.id !== except_user_id);

    return users;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign<User, ICreateUserFakeDTO>(user, {
      id: v4(),
      name,
      email,
      password,
    });

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;

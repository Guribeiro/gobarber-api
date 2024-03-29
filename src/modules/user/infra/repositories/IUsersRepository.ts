import User from '../typeorm/entities/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../../dtos/IFindProvidersDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]>;
}

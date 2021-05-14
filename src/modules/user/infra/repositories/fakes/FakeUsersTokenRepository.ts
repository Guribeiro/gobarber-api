import { v4 } from 'uuid';

import UserToken from '@modules/user/infra/typeorm/entities/UserToken';
import IUserTokenRepository from '@modules/user/infra/repositories/IUsersTokenRepository';

interface ICreateUserTokenFakeDTO {
  id: string;
  token: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

class FakeUserTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign<UserToken, ICreateUserTokenFakeDTO>(userToken, {
      id: v4(),
      token: v4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = this.userTokens.find(userToken => userToken.token === token);

    return user;
  }
}

export default FakeUserTokenRepository;

import FakeUsersRepository from '@modules/user/infra/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'fulano',
      email: 'fulano@hotmail.com',
      password: '1234567',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'fulano2',
      email: 'fulano@hotmail.com2',
      password: '12345672',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'fulano3',
      email: 'fulano@hotmail.com3',
      password: '12345673',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});

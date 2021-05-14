import FakeAppointmentsRepository from '@modules/appointment/infra/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersAppointments from './ListProvidersAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersAppointments: ListProvidersAppointments;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvidersAppointments = new ListProvidersAppointments(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list all providers appointments in a day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2021, 5, 20, 8, 0, 0),
      provider_id: 'provider_id',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2021, 5, 20, 9, 0, 0),
      provider_id: 'provider_id',
    });

    const appointments = await listProvidersAppointments.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 6,
      year: 2021,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});

import FakeAppointmentsRepository from '@modules/appointment/infra/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list all providers', async () => {
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2020, 5, 20, 8, 0, 0),
      provider_id: 'provider_id',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2020, 5, 20, 9, 0, 0),
      provider_id: 'provider_id',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2020, 5, 20, 10, 0, 0),
      provider_id: 'provider_id',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2020, 5, 20, 11, 0, 0),
      provider_id: 'provider_id',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2020, 5, 20, 12, 0, 0),
      provider_id: 'provider_id',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2020, 5, 20, 13, 0, 0),
      provider_id: 'provider_id',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2020, 5, 20, 14, 0, 0),
      provider_id: 'provider_id',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2020, 5, 20, 15, 0, 0),
      provider_id: 'provider_id',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2020, 5, 20, 16, 0, 0),
      provider_id: 'provider_id',
    });
    await fakeAppointmentsRepository.create({
      user_id: 'user-id',
      date: new Date(2020, 5, 20, 17, 0, 0),
      provider_id: 'provider_id',
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'provider_id',
      month: 6,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});

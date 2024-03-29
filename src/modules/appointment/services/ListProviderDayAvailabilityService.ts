import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

// import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointment/infra/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailability {
  constructor(
    @inject('AppointmentsRespoitory')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllDayProvider({
      provider_id,
      day,
      month,
      year,
    });

    const hourStart = 8;

    const eachHourArray = Array.from(
      {
        length: 10,
      },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment => {
        return getHours(appointment.date) === hour;
      });

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

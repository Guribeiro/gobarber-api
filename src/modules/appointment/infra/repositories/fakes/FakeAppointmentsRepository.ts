import { v4 } from 'uuid';
import { getMonth, getYear, getDate, isEqual } from 'date-fns';
import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';
import IFindAllDayProviderDTO from '@modules/appointment/dtos/IFindAllDayProviderDTO';
import IFindAllMonthProviderDTO from '@modules/appointment/dtos/IFindAllMonthProviderDTO';
import IAppointmentRepository from '@modules/appointment/infra/repositories/IAppointmentsRepository';

interface ICreateAppointmentFakeDTO {
  id: string;
  date: Date;
  provider_id: string;
  user_id: string;
}

class FakeAppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign<Appointment, ICreateAppointmentFakeDTO>(appointment, {
      id: v4(),
      date,
      user_id,
      provider_id,
    });

    this.appointments.push(appointment);
    return appointment;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );
    return findAppointment;
  }

  public async findAllMonthProvider({
    provider_id,
    month,
    year,
  }: IFindAllMonthProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllDayProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllDayProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }
}

export default FakeAppointmentsRepository;

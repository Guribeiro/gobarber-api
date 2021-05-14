import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';
import IFindAllMonthProviderDTO from '@modules/appointment/dtos/IFindAllMonthProviderDTO';
import IFindAllDayProviderDTO from '@modules/appointment/dtos/IFindAllDayProviderDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllMonthProvider(data: IFindAllMonthProviderDTO): Promise<Appointment[]>;
  findAllDayProvider(data: IFindAllDayProviderDTO): Promise<Appointment[]>;
}

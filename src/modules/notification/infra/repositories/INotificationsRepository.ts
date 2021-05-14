import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';
import Notification from '../typeorm/schemas/Notification';

export default interface INotificationRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}

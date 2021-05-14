import { getMongoRepository, MongoRepository } from 'typeorm';
import INotificationRepository from '../../repositories/INotificationsRepository';
import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';
import Notification from '../schemas/Notification';

export default class FakeNotificationRepository
  implements INotificationRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

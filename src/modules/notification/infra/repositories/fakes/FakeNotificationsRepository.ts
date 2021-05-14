import { ObjectID } from 'mongodb';
import INotificationRepository from '../INotificationsRepository';
import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';
import Notification from '../../typeorm/schemas/Notification';

interface ICreateNotificationFakeDTO {
  id: ObjectID;
  content: string;
  recipient_id: string;
}

export default class FakeNotificationRepository
  implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign<Notification, ICreateNotificationFakeDTO>(notification, {
      id: new ObjectID(),
      content,
      recipient_id,
    });

    this.notifications.push(notification);

    return notification;
  }
}

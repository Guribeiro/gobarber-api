import IEmailProvider from '../models/IEmailProvider';
import ISendEmailProviderDTO from '../dtos/ISendEmailProviderDTO';

export default class FakeSendEmailProvider implements IEmailProvider {
  private messages: ISendEmailProviderDTO[] = [];

  public async sendEmail(message: ISendEmailProviderDTO): Promise<void> {
    this.messages.push(message);
  }
}

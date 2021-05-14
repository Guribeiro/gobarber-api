import ISendEmailProviderDTO from '../dtos/ISendEmailProviderDTO';

export default interface IEmailProvider {
  sendEmail(data: ISendEmailProviderDTO): Promise<void>;
}

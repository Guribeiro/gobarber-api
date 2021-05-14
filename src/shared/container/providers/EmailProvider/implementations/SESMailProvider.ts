import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';

import mailConfig from '@config/mail';
import IEmailProvider from '../models/IEmailProvider';
import ISendEmailProviderDTO from '../dtos/ISendEmailProviderDTO';
import IMailTemplateProvider from '../../EmailTemplateProvider/models/IEmailTemplateProvider';

@injectable()
export default class SESMailProvider implements IEmailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-2',
      }),
    });
  }

  public async sendEmail({
    to,
    subject,
    templateData,
    from,
  }: ISendEmailProviderDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;
    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}

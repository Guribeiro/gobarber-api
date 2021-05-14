import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotEmailService from '@modules/user/services/SendForgotEmailService';

export default class SendForgotEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotEmailService = container.resolve(SendForgotEmailService);

    await sendForgotEmailService.execute({
      email,
    });

    return response.status(200).json();
  }
}

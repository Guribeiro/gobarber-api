import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/user/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    const user = await resetPasswordService.execute({
      password,
      token,
    });

    return response.status(200).json(user);
  }
}

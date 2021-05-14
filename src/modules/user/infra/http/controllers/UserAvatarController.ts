import { Request, Response } from 'express';

import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/user/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: filename,
    });

    return response.json(classToClass(user));
  }
}

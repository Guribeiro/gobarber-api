import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthentication from '@modules/user/infra/http/middlewares/ensureAuthenticate';

import ProfileController from '../controllers/ProfileController';

const usersRouter = Router();

const profileController = new ProfileController();
usersRouter.use(ensureAuthentication);

usersRouter.get('/', profileController.show);
usersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default usersRouter;

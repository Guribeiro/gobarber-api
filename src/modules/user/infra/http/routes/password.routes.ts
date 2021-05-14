import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ResetPasswordController from '../controllers/ResetPasswordController';
import SendForgotEmailService from '../controllers/SendForgotEmailController';

const resetPasswordController = new ResetPasswordController();
const sendForgotEmailService = new SendForgotEmailService();

const passwordRouter = Router();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  sendForgotEmailService.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;

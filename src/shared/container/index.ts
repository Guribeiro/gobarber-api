import 'reflect-metadata';
import { container } from 'tsyringe';

import '@shared/container/providers';
import '@modules/user/providers';

import IAppointmentsRespoitory from '@modules/appointment/infra/repositories/IAppointmentsRepository';
import AppointmentsRespoitory from '@modules/appointment/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/user/infra/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';

import IUsersTokenRepository from '@modules/user/infra/repositories/IUsersTokenRepository';
import UsersTokenRepository from '@modules/user/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notification/infra/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notification/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentsRespoitory>(
  'AppointmentsRespoitory',
  AppointmentsRespoitory,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokenRepository',
  UsersTokenRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

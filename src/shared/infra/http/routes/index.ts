import { Router } from 'express';

import passwordRouter from '@modules/user/infra/http/routes/password.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import usersRouter from '@modules/user/infra/http/routes/users.routes';
import appointmentsRouter from '@modules/appointment/infra/http/routes/appointments.routes';
import profileRouter from '@modules/user/infra/http/routes/profile.routes';
import providersRouter from '@modules/appointment/infra/http/routes/providers.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter);

export default routes;

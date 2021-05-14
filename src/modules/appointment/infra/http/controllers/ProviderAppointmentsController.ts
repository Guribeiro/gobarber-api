import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointments from '@modules/appointment/services/ListProvidersAppointmentsService';
import { classToClass } from 'class-transformer';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { day, month, year } = request.query;

    const listProvidersAppointments = container.resolve(
      ListProvidersAppointments,
    );

    const appointment = await listProvidersAppointments.execute({
      provider_id: id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointment));
  }
}

import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProvidersDayAvailabilityService from '../../../services/ListProviderDayAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;
    const listProvidersDayAvailabilityService = container.resolve(
      ListProvidersDayAvailabilityService,
    );

    const availability = await listProvidersDayAvailabilityService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return response.json(availability);
  }
}

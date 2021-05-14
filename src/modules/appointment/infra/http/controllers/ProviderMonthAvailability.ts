import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderMonthAvailabilityService from '../../../services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;
    const listProvidersDayAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await listProvidersDayAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });
    return response.json(availability);
  }
}

import { AxiosResponse } from 'axios';
import ApiService from './api.service';
import PaginatedModel from '@/models/PaginatedModel';
import LocomotiveModel, { FilterLocomotivesModel } from '@/models/rosters/Locomotive'

const locomotiveService = {
  async getLocomotives(filter?: FilterLocomotivesModel): Promise<PaginatedModel<LocomotiveModel>> {
    let url = 'locomotives';

    if (filter) {
      const query = filter.toQueryString();
      url = `${url}?${query}`;
    }

    return ApiService.get(url).then((response: AxiosResponse) => {
      const pagedResponse = new PaginatedModel<LocomotiveModel>(response);
      pagedResponse.data = response.data.map((x: any) => new LocomotiveModel(x));
      return pagedResponse;
    });
  }
}

export default locomotiveService;

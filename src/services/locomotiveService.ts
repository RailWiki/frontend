import { AxiosResponse } from 'axios';
import ApiService from './api.service';
import PaginatedModel from '@/models/PaginatedModel';
import LocomotiveModel, { FilterLocomotivesModel } from '@/models/rosters/Locomotive';
import PhotoModel from '@/models/photos/Photo';

const locomotiveService = {
  async getLocomotive(id: number): Promise<LocomotiveModel> {
    const url = `locomotives/${id}`;

    return ApiService.get(url).then((response: AxiosResponse) => {
      const locomotive = new LocomotiveModel(response.data);
      return locomotive;
    });
  },

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
  },

  async create(locomotive: LocomotiveModel): Promise<LocomotiveModel> {
    return ApiService.post('locomotives', locomotive).then((response: AxiosResponse) => {
      return new LocomotiveModel(response.data);
    });
  }
};

export default locomotiveService;

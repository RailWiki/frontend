import { AxiosResponse } from 'axios';
import ApiService from './api.service';
import PaginatedModel from '@/models/PaginatedModel';
import LocomotiveTypeModel, { FilterLocomotiveTypesModel } from '@/models/rosters/LocomotiveType';

const locomotiveTypesService = {
  async getTypes(filter?: FilterLocomotiveTypesModel): Promise<PaginatedModel<LocomotiveTypeModel>> {
    let url = 'locomotive-types';

    if (filter) {
      const query = filter.toQueryString();
      url = `${url}?${query}`;
    }

    return ApiService.get(url).then((response: AxiosResponse) => {
      const pagedResponse = new PaginatedModel<LocomotiveTypeModel>(response);
      pagedResponse.data = response.data.map((x: any) => new LocomotiveTypeModel(x));
      return pagedResponse;
    });
  }
};

export default locomotiveTypesService;

import { AxiosResponse } from 'axios';
import ApiService from './api.service';
import PaginatedModel from '@/models/PaginatedModel';
import RoadModel, { FilterRoadsModel } from '@/models/rosters/Road';
import RoadTypeModel from '@/models/rosters/RoadType';

const roadService = {
  async getRoads(filter?: FilterRoadsModel): Promise<PaginatedModel<RoadModel>> {
    let url = 'roads';

    if (filter) {
      const query = filter.toQueryString();
      url = `${url}?${query}`;
    }

    return ApiService.get(url).then((response: AxiosResponse) => {
      const pagedResponse = new PaginatedModel<RoadModel>(response);
      pagedResponse.data = response.data.map((x: any) => new RoadModel(x));

      return pagedResponse;
    });
  },

  async getRoadTypes(): Promise<RoadTypeModel[]> {
    return ApiService.get('road-types').then((response: AxiosResponse) => {
      const types = response.data.map((x: any) => new RoadTypeModel(x));
      return types;
    });
  },

  async getRoadTypeBySlug(slug: string): Promise<RoadTypeModel> {
    return ApiService.get(`road-types/slug/${slug}`).then((response: AxiosResponse) => {
      const type = new RoadTypeModel(response.data);
      return type;
    });
  }
}

export default roadService;

// export default class RoadService {
//   public async getRoads(roadTypeId: number | null): Promise<PagedResponseModel<RoadModel>> {
//     return ApiService.get('roads').then((response: AxiosResponse) => {
//       var pagedResponse = new PagedResponseModel<RoadModel>(response);
//       pagedResponse.data = response.data.map((x: any) => new RoadModel(x));

//       return pagedResponse;
//     })
//   };

//   public async getRoadTypes(): Promise<RoadTypeModel[]> {
//     return ApiService.get('road-types').then((response: AxiosResponse) => {
//       var types = response.data.map((x: any) => new RoadTypeModel(x));
//       return types;
//     })
//   };
// }

import ApiService from './api.service';
import LocationModel, { FilterLocationsModel } from '../models/geography/Location';

const locationService = {
  async search(filter?: FilterLocationsModel): Promise<LocationModel[]> {
    let url = 'locations';

    if (filter) {
      const query = filter.toQueryString();
      url = `${url}?${query}`;
    }

    const response = await ApiService.get(url);
    const data = response.data.map((item: any) => new LocationModel(item));
    return data;
  }
};

export default locationService;

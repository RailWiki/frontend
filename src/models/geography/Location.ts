import FilterModel from '../FilterModel';

export default class LocationModel {
  public id = 0;
  public name = '';

  public latitude: number | null = null;
  public longitude: number | null = null;

  public stateProvinceId = 0;
  public stateProvinceName = '';
  public stateProvinceAbbreviation = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class FilterLocationsModel extends FilterModel {
  public stateId: number | null = null;
  public name: string | null = null;

  // public page = 1;
}

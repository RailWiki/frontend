import FilterModel from '../FilterModel';

export default class LocomotiveTypeModel {
  public id = 0;
  public family: string | null = null;
  public manufacturer: string | null = null;
  public name = '';

  public locomotiveCount = 0;

  constructor(data: any | null) {
    Object.assign(this, data);
  }
}

export class FilterLocomotiveTypesModel extends FilterModel {
  public manufacturer: string | null = null;
  public name: string | null = null;

  public page = 1;
}

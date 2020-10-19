import RoadTypeModel from './RoadType';
import FilterModel from '../FilterModel';

export default class RoadModel {
  public id = 0;

  public roadTypeId = 0;
  public roadType: RoadTypeModel | null = null;

  public parentId: number | null = null;

  public name = '';
  public slug = '';
  public reportingMarks = '';

  public locomotiveCount = 0;
  public rollingStockCount = 0;

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);

      this.roadType = new RoadTypeModel(data.roadType);
    }
  }
}

export class FilterRoadsModel extends FilterModel {
  public typeId: number | null = null;
  public query: string | null = null;

  public page = 1;
  public pageSize = 50;
}

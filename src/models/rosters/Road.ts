import RoadTypeModel from './RoadType';
import FilterModel from '../FilterModel';

export default class RoadModel {
  public id: number = 0;

  public roadTypeId: number = 0;
  public roadType: RoadTypeModel | null = null;

  public parentId: number | null = null;

  public name: string = '';
  public slug: string = '';
  public reportingMarks: string = '';

  public locomotiveCount: number = 0;
  public rollingStockCount: number = 0;

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

  public page: number = 1;
  public pageSize: number = 50;
}

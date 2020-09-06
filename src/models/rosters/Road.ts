import RoadTypeModel from './RoadType';

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

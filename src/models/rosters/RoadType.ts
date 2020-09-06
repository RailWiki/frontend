export default class RoadTypeModel {
  public id: number = 0;

  public name: string = '';
  public slug: string = '';

  public displayOrder: number = 0;

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

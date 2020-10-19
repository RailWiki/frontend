export default class RoadTypeModel {
  public id = 0;

  public name = '';
  public slug = '';

  public displayOrder = 0;

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

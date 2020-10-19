import RoadModel from './Road';

export default class RosterItemModel {
  public id = 0;

  public roadId = 0;
  public road: RoadModel | null = null;

  public roadNumber = '';
  public reportingMarks = '';

  public notes: string | null = null;
  public slug = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);

      this.road = new RoadModel(data.road);
    }
  }
}

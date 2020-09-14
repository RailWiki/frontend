import RoadModel from './Road';

export default class RosterItemModel {
  public id: number = 0;

  public roadId: number = 0;
  public road: RoadModel | null = null;

  public roadNumber: string = '';

  public notes: string | null = null;
  public slug: string = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);

      this.road = new RoadModel(data.road);
    }
  }
}

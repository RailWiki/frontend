import LocationModel from '../geography/Location';
import UserModel from '../User';

export default class AlbumModel {
  public id = 0;
  public user?: UserModel = new UserModel();
  public title = '';
  public description = '';

  public coverPhotoId: number | null = null;
  public coverPhotoUrl = '';

  public location?: LocationModel;

  public createdOn: string = new Date().toISOString();
  public updatedOn: string = new Date().toISOString();

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
      this.user = new UserModel(data.user);

      if (data.location) {
        this.location = new LocationModel(data.location);
      }
    }
  }
}

export class WriteAlbumModel {
  public id = 0;
  public title = '';
  public description = '';
  public locationId: number | null = null;
}

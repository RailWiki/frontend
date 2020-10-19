import UserModel from '../User';

export default class AlbumModel {
  public id = 0;
  public userId = 0;
  public user?: UserModel;
  public title = '';
  public description = '';
  public createdOn: string = new Date().toISOString();
  public updatedOn: string = new Date().toISOString();

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
      this.user = new UserModel(data.user);
    }
  }
}

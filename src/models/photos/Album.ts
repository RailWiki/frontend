import UserModel from '../User';

export default class AlbumModel {
  public id: number = 0;
  public userId: number = 0;
  public user?: UserModel;
  public title: string = '';
  public description: string = '';
  public createdOn: string = new Date().toISOString();
  public updatedOn: string = new Date().toISOString();

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
      this.user = new UserModel(data.user);
    }
  }
}

import FilterModel from './FilterModel';

export default class UserModel {
  public id = 0;
  public email = '';
  public firstName = '';
  public lastName = '';
  public fullName = '';
  public slug = '';

  constructor(data: any) {
    Object.assign(this, data);
  }
}

export class FilterUsersModel extends FilterModel {
  public query: string | null = null;
}

export class UserStatsModel {
  public userId = 0;
  public userName = '';

  public photoCount = 0;
  public locomotiveCount = 0;
  public rollingStockCount = 0;
  public locationCount = 0;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

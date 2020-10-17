import FilterModel from './FilterModel';

export default class UserModel {
  public id: number = 0;
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public fullName: string = '';

  constructor(data: any) {
    Object.assign(this, data);
  }
}

export class FilterUsersModel extends FilterModel {
  public query: string | null = null;
}

export class UserStatsModel {
  public userId: number = 0;
  public userName: string = '';

  public photoCount: number = 0;
  public locomotiveCount: number = 0;
  public rollingStockCount: number = 0;
  public locationCount: number = 0;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

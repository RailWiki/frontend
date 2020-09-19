import FilterModel from './FilterModel';

export default class UserModel {
  public id: number = 0;
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';

  constructor(data: any) {
    Object.assign(this, data);
  }
}

export class FilterUsersModel extends FilterModel {
  public query: string | null = null;
}

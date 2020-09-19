import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import PaginatedModel from '@/models/PaginatedModel';
import UserModel, { FilterUsersModel } from '@/models/User';
import { TableSimplePlugin } from 'bootstrap-vue';
import userService from '@/services/user.service';

@Module({namespaced: true })
export default class UserModule extends VuexModule {
  public _isLoading: boolean = false;

  public _users: PaginatedModel<UserModel> = new PaginatedModel<UserModel>();

  get isLoading(): boolean {
    return this._isLoading;
  }

  get users(): PaginatedModel<UserModel> {
    return this._users;
  }

  @Mutation
  public _setIsLoading(loading: boolean) {
    this._isLoading = loading;
  }

  @Mutation
  public _setUsers(users: PaginatedModel<UserModel>) {
    this._users = users;
  }

  @Action
  public async loadUsers(filter?: FilterUsersModel) {
    this.context.commit('_setIsLoading', true);

    return userService.getUsers(filter).then((users: PaginatedModel<UserModel>) => {
      this.context.commit('_setIsLoading', false);
      this.context.commit('_setUsers', users);
    });
  }
}

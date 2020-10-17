import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import PaginatedModel from '@/models/PaginatedModel';
import UserModel, { FilterUsersModel, UserStatsModel } from '@/models/User';
import { TableSimplePlugin } from 'bootstrap-vue';
import userService from '@/services/user.service';

@Module({namespaced: true })
export default class UserModule extends VuexModule {
  public _isLoading: boolean = false;

  public _user: UserModel | null = null;
  public _userStats: UserStatsModel | null = null;

  public _users: PaginatedModel<UserModel> = new PaginatedModel<UserModel>();

  get isLoading(): boolean {
    return this._isLoading;
  }

  public get user(): UserModel | null {
    return this._user;
  }

  public get userStats(): UserStatsModel | null {
    return this._userStats;
  }

  get users(): PaginatedModel<UserModel> {
    return this._users;
  }

  @Mutation
  public _setIsLoading(loading: boolean) {
    this._isLoading = loading;
  }

  @Mutation
  public _setUser(user: UserModel | null) {
    this._user = user;
  }

  @Mutation
  public _setUserStats(stats: UserStatsModel | null) {
    this._userStats = stats;
  }

  @Mutation
  public _setUsers(users: PaginatedModel<UserModel>) {
    this._users = users;
  }

  @Action({ rawError: true })
  public async loadById(id: number) {
    this.context.commit('_setIsLoading', true);

    return userService.getById(id).then((user: UserModel) => {
      this.context.commit('_setUser', user);

      return userService.getUserStats(id).then((stats: UserStatsModel) => {
        this.context.commit('_setUserStats', stats);
        this.context.commit('_setIsLoading', false);
      });
    });
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

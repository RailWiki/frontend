import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import LocomotiveModel, { FilterLocomotivesModel } from '@/models/rosters/Locomotive';
import LocomotiveService from '@/services/locomotiveService';
import PaginatedModel from '@/models/PaginatedModel';

@Module({namespaced: true})
export default class LocomotiveModule extends VuexModule {
  _isLoading: boolean = true;

  _locomotives: PaginatedModel<LocomotiveModel> = new PaginatedModel<LocomotiveModel>();
  _filters: FilterLocomotivesModel = new FilterLocomotivesModel();

  get isLoading(): boolean {
    return this._isLoading;
  }

  get locomotives(): PaginatedModel<LocomotiveModel> {
    return this._locomotives;
  }

  get filters(): FilterLocomotivesModel {
    return this._filters;
  }

  @Mutation
  _setIsLoading(loading: boolean) {
    this._isLoading = loading;
  }

  @Mutation
  _setLocomotives(locomotives: PaginatedModel<LocomotiveModel>) {
    this._locomotives = locomotives;
  }

  @Mutation
  _setFilters(filter: FilterLocomotivesModel) {
    this._filters = filter;
  }

  @Action
  async loadLocomotives() {
    this.context.commit('_setIsLoading', true);

    return LocomotiveService.getLocomotives(this.context.getters['filters']).then((locomotives: PaginatedModel<LocomotiveModel>) => {
      this.context.commit('_setLocomotives', locomotives);
      this.context.commit('_setIsLoading', false);

    });
  }

  @Action
  async search(filter: FilterLocomotivesModel) {
    this.context.commit('_setFilters', filter);
    await this.context.dispatch('loadLocomotives');
  }

}

import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import LocomotiveTypeModel, { FilterLocomotiveTypesModel } from '@/models/rosters/LocomotiveType';
import LocomotiveTypeService from '@/services/locomotiveTypesService';
import PaginatedModel from '@/models/PaginatedModel';

@Module({namespaced: true})
export default class LocomotiveTypeModule extends VuexModule {
  _isLoading: boolean = true;

  _types: PaginatedModel<LocomotiveTypeModel> = new PaginatedModel<LocomotiveTypeModel>();
  _filters: FilterLocomotiveTypesModel = new FilterLocomotiveTypesModel();

  get isLoading(): boolean {
    return this._isLoading;
  }

  get types(): PaginatedModel<LocomotiveTypeModel> {
    return this._types;
  }

  get filters(): FilterLocomotiveTypesModel {
    return this._filters;
  }

  @Mutation
  _setIsLoading(loading: boolean) {
    this._isLoading = loading;
  }

  @Mutation
  _setTypes(types: PaginatedModel<LocomotiveTypeModel>) {
    this._types = types;
  }

  @Mutation
  _setFilters(filter: FilterLocomotiveTypesModel) {
    this._filters = filter;
  }

  @Action
  public async loadLocomotiveTypes() {
    this.context.commit('_setIsLoading', true);

    return LocomotiveTypeService.getTypes(this.context.getters.filters).then((types: PaginatedModel<LocomotiveTypeModel>) => {
      this.context.commit('_setTypes', types);
      this.context.commit('_setIsLoading', false);

    });
  }

  // @Action
  // public async search(filter: FilterLocomotivesModel) {
  //   this.context.commit('_setFilters', filter);
  //   await this.context.dispatch('loadLocomotives');
  // }

  // @Action
  // public async clearFilters() {
  //   this.context.commit('_setFilters', new FilterLocomotivesModel());

  //   await this.context.dispatch('loadLocomotives');
  // }
}

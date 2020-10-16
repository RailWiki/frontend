import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import LocomotiveModel, { FilterLocomotivesModel } from '@/models/rosters/Locomotive';
import LocomotiveService from '@/services/locomotiveService';
import PaginatedModel from '@/models/PaginatedModel';
import PhotoModel from '@/models/photos/Photo';

@Module({namespaced: true})
export default class LocomotiveModule extends VuexModule {
  _isLoading: boolean = true;

  _locomotive: LocomotiveModel | null = null;

  _locomotives: PaginatedModel<LocomotiveModel> = new PaginatedModel<LocomotiveModel>();
  _filters: FilterLocomotivesModel = new FilterLocomotivesModel();

  get isLoading(): boolean {
    return this._isLoading;
  }

  get locomotive(): LocomotiveModel | null {
    return this._locomotive;
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
  _setLocomotive(locomotive: LocomotiveModel | null) {
    this._locomotive = locomotive;
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
  public async loadLocomotive(id: number) {
    this.context.commit('_setIsLoading', true);

    return LocomotiveService.getLocomotive(id).then((locomotive: LocomotiveModel) => {
      this.context.commit('_setLocomotive', locomotive);
      this.context.commit('_setIsLoading', false);
    });
  }

  @Action
  public async loadLocomotives() {
    this.context.commit('_setIsLoading', true);

    return LocomotiveService.getLocomotives(this.context.getters.filters).then((locomotives: PaginatedModel<LocomotiveModel>) => {
      this.context.commit('_setLocomotives', locomotives);
      this.context.commit('_setIsLoading', false);

    });
  }

  @Action
  public async search(filter: FilterLocomotivesModel) {
    this.context.commit('_setFilters', filter);
    await this.context.dispatch('loadLocomotives');
  }

  @Action
  public async clearFilters() {
    this.context.commit('_setFilters', new FilterLocomotivesModel());

    await this.context.dispatch('loadLocomotives');
  }

  @Action
  public async addLocomotive(locomotive: LocomotiveModel) {
    this.context.commit('_setIsLoading', true);

    return LocomotiveService.create(locomotive).then((newLoco: LocomotiveModel) => {
      this.context.commit('_setIsLoading', false);
      // TODO: add to locos in state

      return newLoco;
    });
  }
}

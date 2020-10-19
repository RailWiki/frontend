import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import RoadModel, { FilterRoadsModel } from '@/models/rosters/Road';
import RoadTypeModel from '@/models/rosters/RoadType';
import roadService from '@/services/roadService';
import PaginatedModel from '@/models/PaginatedModel';

@Module({ namespaced: true })
export default class RoadModule extends VuexModule {
  private _isRoadsLoading = false;

  private _currentRoadType: RoadTypeModel | null = null;
  private _roadTypes: RoadTypeModel[] = new Array<RoadTypeModel>();

  private _currentRoad: RoadModel | null = null;
  private _roads: PaginatedModel<RoadModel> = new PaginatedModel<RoadModel>();
  private _roadsFilter: FilterRoadsModel = new FilterRoadsModel();

  get isRoadsLoading(): boolean {
    return this._isRoadsLoading;
  }

  get currentRoadType(): RoadTypeModel | null {
    return this._currentRoadType;
  }

  get roadTypes(): RoadTypeModel[] {
    return this._roadTypes;
  }

  get currentRoad(): RoadModel | null {
    return this._currentRoad;
  }

  get roads(): PaginatedModel<RoadModel> {
    return this._roads;
  }

  get roadsFilter(): FilterRoadsModel {
    return this._roadsFilter;
  }

  @Mutation
  private _setIsRoadsLoading(loading: boolean) {
    this._isRoadsLoading = loading;
  }

  @Mutation
  private _setCurrentRoadType(type: RoadTypeModel | null) {
    this._currentRoadType = type;
  }

  @Mutation
  private _setRoadTypes(types: RoadTypeModel[]) {
    this._roadTypes = types;
  }

  @Mutation
  private _setCurrentRoad(road: RoadModel | null) {
    this._currentRoad = road;
  }

  @Mutation
  private _setRoads(roads: PaginatedModel<RoadModel>) {
    this._roads = roads;
  }

  @Mutation
  private _setRoadsFilter(filter: FilterRoadsModel) {
    this._roadsFilter = filter;
  }

  @Action
  public async loadRoadTypes() {
    this.context.commit('_setIsRoadsLoading', true);

    return roadService.getRoadTypes().then((types: RoadTypeModel[]) => {
      this.context.commit('_setRoadTypes', types);
      this.context.commit('_setIsRoadsLoading', false);
    });
  }

  @Action
  public async loadRoadTypeBySlug(typeSlug: string) {
    this.context.commit('_setIsRoadsLoading', true);

    return roadService.getRoadTypeBySlug(typeSlug).then((type: RoadTypeModel) => {
      this.context.commit('_setCurrentRoadType', type);
      this.context.commit('_setIsRoadsLoading', false);
    });
  }

  @Action
  public setRoadsFilter(filter: FilterRoadsModel) {
    this.context.commit('_setRoadsFilter', filter);
  }

  @Action
  public async loadRoads(filter?: FilterRoadsModel) {
    this.context.commit('_setIsRoadsLoading', true);
    // const filter = this._roadsFilter;

    // filter.typeId = this._currentRoadType ? this._currentRoadType.id : null;

    return roadService.getRoads(filter).then((roads: PaginatedModel<RoadModel>) => {
      this.context.commit('_setRoads', roads);
      this.context.commit('_setIsRoadsLoading', false);
    });
  }

  @Action({ rawError: true })
  public async loadRoad(id: number) {
    this.context.commit('_setIsRoadsLoading', true);
    return roadService.getById(id).then((road: RoadModel) => {
      this.context.commit('_setCurrentRoad', road);
      this.context.commit('_setIsRoadsLoading', false);
    });
  }

  // @Action
  // // TODO: this doesn't work due to complaining about dynamic modules??
  // async search(filter: FilterRoadsModel) {
  //   this.context.commit('_setRoadsFilter', filter);
  //   await this.context.dispatch('loadRoads');
  // }
}

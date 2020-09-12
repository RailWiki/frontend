import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import RoadModel, { FilterRoadsModel } from '@/models/rosters/Road';
import RoadTypeModel from '@/models/rosters/RoadType';
import roadService from '@/services/roadService';
import PaginatedModel from '@/models/PaginatedModel';

@Module({namespaced: true})
export default class RoadModule extends VuexModule {
  _isRoadsLoading: boolean = false;

  _currentRoadType: RoadTypeModel | null = null;
  _roadTypes: RoadTypeModel[] = new Array<RoadTypeModel>();

  _currentRoad: RoadModel | null = null;
  _roads: PaginatedModel<RoadModel> = new PaginatedModel<RoadModel>();
  _roadsFilter: FilterRoadsModel = new FilterRoadsModel();

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
  _setIsRoadsLoading(loading: boolean) {
    this._isRoadsLoading = loading;
  }

  @Mutation
  _setCurrentRoadType(type: RoadTypeModel | null) {
    this._currentRoadType = type;
  }

  @Mutation
  _setRoadTypes(types: RoadTypeModel[]) {
    this._roadTypes = types;
  }

  @Mutation
  _setCurrentRoad(road: RoadModel | null) {
    this._currentRoad = road;
  }

  @Mutation
  _setRoads(roads: PaginatedModel<RoadModel>) {
    this._roads = roads;
  }

  @Mutation
  _setRoadsFilter(filter: FilterRoadsModel) {
    this._roadsFilter = filter;
  }

  @Action
  async loadRoadTypes() {
    this.context.commit('_setIsRoadsLoading', true);

    return roadService.getRoadTypes().then((types: RoadTypeModel[]) => {
      this.context.commit('_setRoadTypes', types);
      this.context.commit('_setIsRoadsLoading', false);
    });
  }

  @Action
  async loadRoadTypeBySlug(typeSlug: string) {
    this.context.commit('_setIsRoadsLoading', true);

    return roadService.getRoadTypeBySlug(typeSlug).then((type: RoadTypeModel) => {
      this.context.commit('_setCurrentRoadType', type);
      this.context.commit('_setIsRoadsLoading', false);
    });
  }

  @Action
  setRoadsFilter(filter: FilterRoadsModel) {
    this.context.commit('_setRoadsFilter', filter);
  }

  @Action
  async loadRoads(pageNum: number | null, name?: string) {
    const filter = this.context.getters['roadsFilter'] as FilterRoadsModel;

    const currentRoadType = this.context.getters['currentRoadType'];
    filter.typeId = currentRoadType ? currentRoadType.id : null;
    filter.page = pageNum || 1;

    return roadService.getRoads(filter).then((roads: PaginatedModel<RoadModel>) => {
      this.context.commit('_setRoads', roads);
      this.context.commit('_setIsRoadsLoading', false);
    });
  }
}

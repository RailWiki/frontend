import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import RoadModel from '@/models/rosters/Road';
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
  async loadRoads(pageNum: number | null) {
    const typeId = this.currentRoadType ? this.currentRoadType.id : null;

    if (!pageNum) {
      pageNum = 1;
    }

    return roadService.getRoads(typeId, pageNum).then((roads: PaginatedModel<RoadModel>) => {
      this.context.commit('_setRoads', roads);
      this.context.commit('_setIsRoadsLoading', false);
    });
  }
}

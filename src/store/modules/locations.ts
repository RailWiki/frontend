import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import LocationModel, { FilterLocationsModel } from '@/models/geography/Location';
import LocationService from '@/services/locationService';

@Module({ namespaced: true })
export default class LocationModule extends VuexModule {
  private _isLoading = false;

  private _locations: LocationModel[] = new Array<LocationModel>();

  get isLoading(): boolean {
    return this._isLoading;
  }

  get locations(): LocationModel[] {
    return this._locations;
  }

  @Mutation
  private _setIsLoading(loading: boolean) {
    this._isLoading = loading;
  }

  @Mutation
  private _clearLocations() {
    this._locations = new Array<LocationModel>();
  }

  @Mutation
  private _setLocations(locations: LocationModel[]) {
    this._locations = locations;
  }

  @Action
  public async search(filter: FilterLocationsModel) {
    this.context.commit('_setIsLoading', true);

    const locations = await LocationService.search(filter);

    this.context.commit('_setLocations', locations);
    this.context.commit('_setIsLoading', false);
  }
}

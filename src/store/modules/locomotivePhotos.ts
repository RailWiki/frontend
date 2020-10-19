import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import LocomotivePhotoModel from '../../models/photos/LocomotivePhoto';
import PhotoModel from '@/models/photos/Photo';
import LocomotivePhotoService from '../../services/locomotivePhotoService';

@Module({ namespaced: true })
export default class PhotoModule extends VuexModule {
  private _isLoading = false;
  private _locomotives: LocomotivePhotoModel[] = new Array<LocomotivePhotoModel>();
  private _photos: PhotoModel[] = new Array<PhotoModel>();

  get isLoading(): boolean {
    return this._isLoading;
  }

  get locomotives(): LocomotivePhotoModel[] {
    return this._locomotives;
  }

  get photos(): PhotoModel[] {
    return this._photos;
  }

  @Mutation
  private _setIsLoading(loading: boolean) {
    this._isLoading = loading;
  }

  @Mutation
  private _setLocomotives(locomotives: LocomotivePhotoModel[]) {
    this._locomotives = locomotives;
  }

  @Mutation
  private _setPhotos(photos: PhotoModel[]) {
    this._photos = photos;
  }

  @Action({ rawError: true })
  public async loadPhotoLocomotives(photoId: number) {
    this.context.commit('_setIsLoading', true);

    return LocomotivePhotoService.getByPhotoId(photoId).then((photos: LocomotivePhotoModel[]) => {
      this.context.commit('_setLocomotives', photos);
      this.context.commit('_setIsLoading', false);
    });
  }

  @Action
  public async loadLocomotivePhotos(id: number) {
    this.context.commit('_setIsLoading', true);

    return LocomotivePhotoService.getByLocomotiveId(id).then((photos: PhotoModel[]) => {
      this.context.commit('_setPhotos', photos);
      this.context.commit('_setIsLoading', false);
    });
  }

  @Action
  public async update({ photoId, locoIds }) {
    this.context.commit('_setIsLoading', true);

    return LocomotivePhotoService.update(photoId, locoIds).then(() => {
      this.context.commit('_setIsLoading', false);
    });
  }
}

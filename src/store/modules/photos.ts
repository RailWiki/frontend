import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import PhotoModel from '@/models/photos/Photo';
import PhotoService from '@/services/photoService';

@Module({ namespaced: true })
export default class PhotoModule extends VuexModule {
  private _isLoading = false;
  private _currentPhoto: PhotoModel | null = null;

  private _isSaving = false;
  private _editingError: string | null = null;

  private _latestPhotos: PhotoModel[] = new Array<PhotoModel>();

  get isLoading(): boolean {
    return this._isLoading;
  }

  get currentPhoto(): PhotoModel | null {
    return this._currentPhoto;
  }

  get isSaving(): boolean {
    return this._isSaving;
  }

  get editingError(): string | null {
    return this._editingError;
  }

  get latestPhotos(): PhotoModel[] {
    return this._latestPhotos;
  }

  @Mutation
  private _setIsLoading(loading: boolean) {
    this._isLoading = loading;
  }

  @Mutation
  private _setCurrentPhoto(photo: PhotoModel) {
    this._currentPhoto = photo;
  }

  @Mutation
  private _setIsSaving(saving: boolean) {
    this._isSaving = saving;
  }

  @Mutation
  private _setEditingError(error: string | null) {
    this._editingError = error;
  }

  @Mutation
  private _setLatestPhotos(photos: PhotoModel[]) {
    this._latestPhotos = photos;
  }

  @Action
  public async loadLatestPhotos(max: number) {
    this.context.commit('_setIsLoading', true);

    return PhotoService.getLatest(max).then((photos: PhotoModel[]) => {
      this.context.commit('_setLatestPhotos', photos);
      this.context.commit('_setIsLoading', false);
    });
  }

  @Action
  public async loadPhoto(photoId: number) {
    this.context.commit('_setIsLoading', true);

    return PhotoService.getById(photoId).then((photo: PhotoModel) => {
      this.context.commit('_setIsLoading', false);
      this.context.commit('_setCurrentPhoto', photo);
    });
  }

  @Action
  public async updatePhoto(photo: PhotoModel) {
    this.context.commit('_setEditingError', null);
    this.context.commit('_setIsSaving', true);

    return PhotoService.updatePhoto(photo).then(() => {
      this.context.commit('_setIsSaving', false);
    }).catch(() => {
      this.context.commit('_setIsSaving', false);
      this.context.commit('_setEditingError', 'There was an error saving your photo');
    });
  }
}

export interface PhotoState {
  isLoading: boolean;
  photo?: PhotoModel;
  editing: EditPhotoState;
}

export interface EditPhotoState {
  isEditing: boolean;
  photo?: PhotoModel;
  error?: string;
}

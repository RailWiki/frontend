import { getField, updateField } from 'vuex-map-fields';
import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import PhotoModel from '@/models/photos/Photo';
import PhotoService from '@/services/photoService';
import AlbumService from '@/services/albumService';

@Module({ namespaced: true })
export default class PhotoModule extends VuexModule {
  _isLoading: boolean = false;
  _currentPhoto: PhotoModel | null = null;

  _isSaving: boolean = false;
  _editingError: string | null = null;

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

  @Mutation
  _setIsLoading(loading: boolean) {
    this._isLoading = loading;
  }

  @Mutation
  _setCurrentPhoto(photo: PhotoModel) {
    this._currentPhoto = photo;
  }

  @Mutation
  _setIsSaving(saving: boolean) {
    this._isSaving = saving;
  }

  @Mutation
  _setEditingError(error: string | null) {
    this._editingError = error;
  }

  @Action
  async loadPhoto(photoId: number) {
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
    }).catch((err: any) => {
      this.context.commit('_setIsSaving', false);
      this.context.commit('_setEditingError', 'There was an error saving your photo');
    });
  }
}

export interface IPhotoState {
  isLoading: boolean;
  photo?: PhotoModel;
  editing: IEditPhotoState;
}

export interface IEditPhotoState {
  isEditing: boolean;
  photo?: PhotoModel;
  error?: string;
}

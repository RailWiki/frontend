import { getField, updateField } from 'vuex-map-fields';
import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import PhotoModel from '@/models/photos/Photo';
import PhotoService from '@/services/photoService';
import AlbumService from '@/services/albumService';

@Module({ namespaced: true })
export default class PhotoModule extends VuexModule {
  _isLoading: boolean = false;
  _currentPhoto: PhotoModel | null = null;

  get isLoading(): boolean {
    return this._isLoading;
  }

  get currentPhoto(): PhotoModel | null {
    return this._currentPhoto;
  }

  @Mutation
  _setIsLoading(loading: boolean) {
    this._isLoading = loading;
  }

  @Mutation
  _setCurrentPhoto(photo: PhotoModel) {
    this._currentPhoto = photo;
  }

  @Action
  async loadPhoto(photoId: number) {
    this.context.commit('_setIsLoading', true);

    return PhotoService.getById(photoId).then((photo: PhotoModel) => {
      this.context.commit('_setIsLoading', false);
      this.context.commit('_setCurrentPhoto', photo);
    });
  }
}

export interface IPhotoState {
  isLoading: boolean,
  photo?: PhotoModel,
  editing: IEditPhotoState
}

export interface IEditPhotoState {
  isEditing: boolean,
  photo?: PhotoModel,
  error?: string
}

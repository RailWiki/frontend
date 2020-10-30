import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import { getField, updateField } from 'vuex-map-fields';
import PhotoModel, { UpdatePhotoModel } from '@/models/photos/Photo';
import PhotoService from '@/services/photoService';
import photoService from '@/services/photoService';

interface IPhotoState {
  isLoading: boolean,
  currentPhoto: PhotoModel | null,
  isSaving: boolean,
  editingError: string | null,
  latestPhotos: PhotoModel[]
};

const state = {
  isLoading: false,
  currentPhoto: null,
  isSaving: false,
  editingError: null,
  latestPhotos: new Array<PhotoModel>()
} as IPhotoState;

const getters = {
  getField,
  isLoading(state: IPhotoState): boolean {
    return state.isLoading
  },
  currentPhoto(state: IPhotoState): PhotoModel | null {
    return state.currentPhoto;
  },
  isSaving(state: IPhotoState): boolean {
    return state.isSaving;
  },
  editingError(state: IPhotoState): string | null {
    return state.editingError
  },
  latestPhotos(state: IPhotoState): PhotoModel[] {
    return state.latestPhotos
  }
};

const mutations = {
  updateField,

  setIsLoading(state: IPhotoState, value: boolean) {
    state.isLoading = value;
  },

  setCurrentPhoto(state: IPhotoState, value: PhotoModel | null) {
    state.currentPhoto = value;
  },

  // TODO: Remove in favor of isLoading
  setIsSaving(state: IPhotoState, value: boolean) {
    state.isSaving = value;
  },

  setEditingError(state: IPhotoState, value: string | null) {
    state.editingError = value;
  },

  setLatestPhotos(state: IPhotoState, value: PhotoModel[]) {
    state.latestPhotos = value;
  }
};

const actions = {
  loadLatestPhotos({ commit }, max: number) {
    commit('setIsLoading', true);

    return PhotoService.getLatest(max).then((photos: PhotoModel[]) => {
      commit('setLatestPhotos', photos);
      commit('setIsLoading', false);
    });
  },

  loadPhoto({ commit }, photoId: number) {
    commit('setIsLoading', true);

    return PhotoService.getById(photoId).then((photo: PhotoModel) => {
      commit('setIsLoading', false);
      commit('setCurrentPhoto', photo);
    });
  },

  updatePhoto({ commit, state: IPhotoState }) {
    commit('setEditingError', null);
    commit('setIsSaving', true);

    let model = new UpdatePhotoModel(state.currentPhoto);
    console.log('saving model', typeof model, model);

    return PhotoService.updatePhoto(model).then(() => {
      commit('setIsSaving', false);
    }).catch(() => {
      commit('setIsSaving', false);
      commit('setEditingError', 'There was an error saving your photo');
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

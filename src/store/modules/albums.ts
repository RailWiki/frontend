import { getField, updateField } from 'vuex-map-fields';
import AlbumModel, { WriteAlbumModel } from '@/models/photos/Album';
import PhotoModel from '@/models/photos/Photo';
import AlbumService from '@/services/albumService';
import PhotoService from '@/services/photoService';

// TODO: Move photo things to the photo module

const getDefaultViewingState = () => {
  return new AlbumModel();
}

const getDefaultEditingState = () => {
  return {
    isEditing: false,
    error: null,
    id: 0,
    title: null,
    description: null
  }
};

const state = {
  userAlbums: new Array<AlbumModel>(),
  isLoading: false,

  viewing: {
    ...getDefaultViewingState()
  },
  editing: {
    ...getDefaultEditingState()
  },

  isUploading: false,

  albumPhotos: new Array<PhotoModel>()
};

const getters = {
  getField,
  userAlbums: (state: any) => state.userAlbums
  // albumPhotos: (state: any) => state.albumPhotos
};

const mutations = {
  updateField,

  SET_IS_LOADING(state, loading) {
    state.isLoading = loading;
  },

  SET_VIEWING_ALBUM(state, album) {
    console.log('set viewing ablum', album);
    state.viewing = Object.assign(state.viewing, album);
  },

  SET_USER_ALBUMS(state, albums) {
    state.userAlbums = albums;
  },
  ADD_USER_ALBUM(state, newAlbum) {
    state.userAlbums = [...state.userAlbums, newAlbum];
  },
  SET_IS_EDITING(state, value) {
    state.editing.isEditing = value;
  },
  SET_EDITING_ALBUM(state, album) {
    state.editing = Object.assign(state.editing, album);
  },
  SET_EDITING_ERROR(state, error) {
    state.editing.error = error;
  },
  RESET_EDITING(state) {
    state.editing = getDefaultEditingState()
  },

  SET_ALBUM_PHOTOS(state, photos) {
    state.albumPhotos = photos;
  },

  SET_IS_UPLOADING(state, isUploading: boolean) {
    state.isUploading = isUploading;
  },

  ADD_PHOTOS_TO_ALBUM(state, photos) {
    state.albumPhotos = [...photos, ...state.albumPhotos];
  }
};

const actions = {
  showAddAlbum({ commit }) {
    commit('SET_IS_EDITING', true);
    commit('SET_EDITING_ALBUM', new AlbumModel());
  },

  editAlbum({ commit }, album: AlbumModel) {
    commit('SET_IS_EDITING', true);
    commit('SET_EDITING_ALBUM', album);
  },

  async loadCurrentUserAlbums({ commit }) {
    const albums = await AlbumService.getCurrentUserAlbums();
    commit('SET_USER_ALBUMS', albums);
  },

  async loadUserAlbums({ commit }, userId: number) {
    commit('SET_IS_LOADING', true);

    return AlbumService.getUserAlbums(userId).then((albums: AlbumModel[]) => {
      commit('SET_USER_ALBUMS', albums);
      commit('SET_IS_LOADING', false);
    });
  },

  async loadAlbum({ commit }, albumId: number) {
    commit('SET_IS_LOADING', true);

    return AlbumService.getById(albumId).then((album: AlbumModel) => {
      commit('SET_VIEWING_ALBUM', album);
      commit('SET_IS_LOADING', false);
    });
  },

  async loadAlbumPhotos({ commit }, albumId: number) {
    commit('SET_ALBUM_PHOTOS', []); // Clear any previous photos so there's no "flash"

    return PhotoService.getByAlbumId(albumId).then((photos: PhotoModel[]) => {
      commit('SET_ALBUM_PHOTOS', photos);
    });
  },

  async save({ commit, state }) {
    // TODO: show toast after saved (success & error)

    const model = new WriteAlbumModel();
    model.id = state.editing.id;
    model.title = state.editing.title;
    model.description = state.editing.description;
    model.locationId = state.editing.location
      ? state.editing.location.id
      : null;

    if (state.editing.id === 0) {
      AlbumService.create(model)
        .then((newAlbum) => {
          commit('RESET_EDITING');
          commit('ADD_USER_ALBUM', newAlbum);
        }).catch(() => {
          commit('SET_EDITING_ERROR', 'There was an error creating your album. Please try again.');
        });
    } else {
      AlbumService.update(model)
        .then(() => {
          // TODO: Can't seem to figure out how to get props to update
          // and not overwrite things they shouldn't (ie user)
          commit('SET_VIEWING_ALBUM', {
            title: state.editing.title,
            description: state.editing.description
          })
          commit('RESET_EDITING');
        }).catch(() => {
          commit('SET_EDITING_ERROR', 'There was an error updating your album. Please try again.');
        });
    }
  },

  async uploadPhotos({ commit }, data: any) {
    commit('SET_IS_UPLOADING', true);
    return PhotoService.uploadPhotos(data.albumId, data.files).then((result: PhotoModel[]) => {
      commit('ADD_PHOTOS_TO_ALBUM', result);
      commit('SET_IS_UPLOADING', false);
    });
  },

  async setAlbumCover({ commit, dispatch }, data: any) {
    await AlbumService.setAlbumCover(data.albumId, data.photoId);

    // TODO: Don't reload all the albums
    await dispatch('loadCurrentUserAlbums');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

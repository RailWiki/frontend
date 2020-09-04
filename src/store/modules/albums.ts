import { getField, updateField } from 'vuex-map-fields';
import AlbumModel from '@/models/photos/Album';
import PhotoModel from '@/models/photos/Photo';
import AlbumService from '@/services/albumService';
import PhotoService from '@/services/photoService';

// TODO: Move photo things to the photo module

const state = {
  userAlbums: new Array<AlbumModel>(),
  isLoading: false,
  viewing: {
    album: new AlbumModel(),
  },
  editing: {
    isEditing: false,
    error: null,
    album: new AlbumModel(),
  },

  isUploading: false,

  albumPhotos: new Array<PhotoModel>()
};

const getters = {
  getField,
  userAlbums: (state: any) => state.userAlbums,
  // albumPhotos: (state: any) => state.albumPhotos
};

const mutations = {
  updateField,

  SET_IS_LOADING(state, loading) {
    state.isLoading = loading
  },

  SET_VIEWING_ALBUM(state, album) {
    state.viewing.album = album;
  },

  SET_USER_ALBUMS(state, albums) {
    state.userAlbums = albums
  },
  ADD_USER_ALBUM(state, newAlbum) {
    state.userAlbums = [...state.userAlbums, newAlbum];
  },
  SET_IS_EDITING(state, value) {
    state.editing.isEditing = value;
  },
  SET_EDITING_ALBUM(state, album) {
    state.editing.album = album;
  },
  SET_EDITING_ERROR(state, error) {
    state.editing.error = error;
  },

  SET_ALBUM_PHOTOS(state, photos) {
    state.albumPhotos = photos;
  },

  SET_IS_UPLOADING(state, isUploading: boolean) {
    state.isUploading = isUploading
  },

  ADD_PHOTOS_TO_ALBUM(state, photos) {
    state.albumPhotos = [...photos, ...state.albumPhotos];
  },
}

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

  async loadAlbum({ commit }, albumId: number) {
    commit('SET_IS_LOADING', true);

    return AlbumService.getById(albumId).then((album: AlbumModel) => {
      commit('SET_VIEWING_ALBUM', album);
      commit('SET_IS_LOADING', false);
    })
  },

  async loadAlbumPhotos({ commit }, albumId: number) {
    commit('SET_ALBUM_PHOTOS', []); // Clear any previous photos so there's no "flash"

    return PhotoService.getByAlbumId(albumId).then((photos: PhotoModel[]) => {
      commit('SET_ALBUM_PHOTOS', photos);
    })
  },

  async save({ commit, state }) {
    // TODO: show toast after saved (success & error)

    if (state.editing.album.id === 0) {
      AlbumService.create(state.editing.album)
        .then((newAlbum) => {
          commit('SET_IS_EDITING', false);
          commit('SET_EDITING_ALBUM', new AlbumModel());
          commit('ADD_USER_ALBUM', newAlbum);
        }).catch((err) => {
          commit('SET_EDITING_ERROR', 'There was an error creating your album. Please try again.');
        });
    } else {
      AlbumService.update(state.editing.album)
      .then(() => {
        commit('SET_IS_EDITING', false);
        commit('SET_EDITING_ALBUM', new AlbumModel());
      }).catch(() => {
        commit('SET_EDITING_ERROR', 'There was an error updating your album. Please try again.');
      });
    }
  },

  async uploadPhotos({ commit }, data: any) {
    commit('SET_IS_UPLOADING', true);
    return PhotoService.uploadPhotos(data.albumId, data.files).then((result: Array<PhotoModel>) => {
      commit('ADD_PHOTOS_TO_ALBUM', result);
      commit('SET_IS_UPLOADING', false);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

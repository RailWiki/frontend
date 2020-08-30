import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';
import { getField, updateField } from 'vuex-map-fields';
import AlbumModel from '@/models/photos/Album';
import AlbumService from '@/services/albumService';

const state = {
  userAlbums: new Array<AlbumModel>(),
  editing: {
    isEditing: false,
    error: null,
    album: new AlbumModel(),
  }
};

const getters = {
  getField,
  userAlbums: (state: any) => state.userAlbums
};

const mutations = {
  updateField,

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
  }
}

const actions = {
  showAddAlbum({ commit }) {
    commit('SET_IS_EDITING', true);
    commit('SET_EDITING_ALBUM', new AlbumModel());
  },

  async loadCurrentUserAlbums({ commit }) {
    const albums = await AlbumService.getCurrentUserAlbums();
    commit('SET_USER_ALBUMS', albums);
  },

  async save({ commit, state }) {
    try {
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
        await AlbumService.update(state.editing.album);
      }
    } catch(err) {
      console.log('save error', err);
      commit('SET_EDITING_ERROR', err)
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

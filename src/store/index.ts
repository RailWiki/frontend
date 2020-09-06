import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';
import Albums from './modules/albums';
import PhotosModule from './modules/photos';
import RoadsModule from './modules/roads';
import UserModel from '@/models/User';
import UserService from '@/services/user.service';

Vue.use(Vuex);

export interface AppState {
  currentUser: UserModel | null
}

const logger = createLogger({
  collapsed: true,
  logActions: true,
  logMutations: false
});

export default new Vuex.Store({
  state: {
    currentUser: null
  } as AppState,
  getters: {
    currentUser: state => state.currentUser
  },
  mutations: {
    SET_CURRENT_USER(state, user: UserModel) {
      state.currentUser = user;
    }
  },
  actions: {
    async setCurrentUser({ commit, state }): Promise<void> {
      if (!state.currentUser) {
        console.log('action: set current user');
        const user = await UserService.getCurrentUser();
        commit('SET_CURRENT_USER', user);
      }
    }
  },
  modules: {
    albums: Albums,
    photos: PhotosModule,
    roads: RoadsModule
  },
  plugins: [
    logger
  ]
});

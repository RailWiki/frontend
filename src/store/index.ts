import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';
import Albums from './modules/albums';
import CommentsModule from './modules/comments';
import PhotosModule from './modules/photos';
import RoadsModule from './modules/roads';
import LocationModule from './modules/locations';
import LocomotivesModule from './modules/locomotives';
import LocomotiveTypesModule from './modules/locomotiveTypes';
import LocomotivePhotosModule from './modules/locomotivePhotos';
import UserModule from './modules/users';
import UserModel from '@/models/User';
import UserService from '@/services/user.service';

Vue.use(Vuex);

export interface AppState {
  currentUser: UserModel | null;
  apiCallsInProgress: number;
}

const logger = createLogger({
  collapsed: true,
  logActions: true,
  logMutations: false
});

// TODO: Move current user to the userModule

export default new Vuex.Store({
  state: {
    currentUser: null,
    apiCallsInProgress: 0,
  } as AppState,
  getters: {
    currentUser: (state) => state.currentUser,
    isCurrentUserApproved: (state) => state.currentUser
      && state.currentUser.isApproved,
    apiCallsInProgress: (state: AppState) => state.apiCallsInProgress,
    showLoadingIndicator: (state: AppState) => state.apiCallsInProgress > 0,
  },
  mutations: {
    SET_CURRENT_USER(state, user: UserModel) {
      state.currentUser = user;
    },

    INCREASE_CURRENT_API_CALL_COUNT(state: AppState) {
      state.apiCallsInProgress = state.apiCallsInProgress + 1;
    },

    DECREASE_CURRENT_API_CALL_COUNT(state: AppState) {
      state.apiCallsInProgress = state.apiCallsInProgress - 1;
    },
  },
  actions: {
    async setCurrentUser({ commit, state }): Promise<void> {
      if (!state.currentUser) {
        const user = await UserService.getCurrentUser();
        commit('SET_CURRENT_USER', user);
      }
    }
  },
  modules: {
    albums: Albums,
    comments: CommentsModule,
    photos: PhotosModule,
    roads: RoadsModule,
    locations: LocationModule,
    locomotives: LocomotivesModule,
    locomotiveTypes: LocomotiveTypesModule,
    locomotivePhotos: LocomotivePhotosModule,
    users: UserModule
  },
  plugins: [
    logger
  ]
});

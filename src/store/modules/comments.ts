import { getField, updateField } from 'vuex-map-fields';
import CommentModel, { PostCommentModel } from '@/models/photos/Comment';
import CommentService from '@/services/commentService';

interface ICommentState {
  comments: CommentModel[],
  isLoading: boolean,
  isEditing: boolean,
  editing: CommentModel | null
};

const getDefaultEditingState = () => {
  return new PostCommentModel({
    entityType: '',
    entityId: 0,
    commentText: ''
  });
}

const state = {
  comments: new Array<CommentModel>(),
  isLoading: false,

  isEditing: false,
  editing: {
    ...getDefaultEditingState()
  },

} as ICommentState;

const getters = {
  getField,
  // isLoading(state: ICommentState): boolean {
  //   return state.isLoading;
  // },
  // isEditing(state: ICommentState): boolean {
  //   return state.isEditing;
  // },

};

const mutations = {
  updateField,

  setIsLoading(state: ICommentState, value: boolean) {
    state.isLoading = value;
  },
  setIsEditing(state: ICommentState, value: boolean) {
    state.isEditing = value;
  },
  setComments(state: ICommentState, value: CommentModel[]) {
    state.comments = value;
  },
  addComment(state: ICommentState, value: CommentModel) {
    state.comments = [ value, ...state.comments ];
  }
};

const actions = {
  async loadComments({ commit }, { entityType, entityId }) {
    commit('setIsLoading', true);

    const comments = await CommentService.getCommentsForEntity(entityType, entityId);
    commit('setComments', comments);
    commit('setIsLoading', false);
  },

  async saveComment({ commit }, { entityType, entityId, comment }) {
    commit('setIsLoading', true);

    const model = new PostCommentModel();
    model.entityType = entityType;
    model.entityId = entityId;
    model.commentText = comment.text;

    if (!comment.id) {
      const newComment = await CommentService.postComment(model);
      commit('addComment', newComment);
      commit('setIsLoading', false);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

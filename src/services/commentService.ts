import ApiService from './api.service';
import CommentModel, { PostCommentModel } from '../models/photos/Comment';

const commentService = {
  async getCommentsForEntity(entityType: string, entityId: number) : Promise<CommentModel[]> {
    const url = `comments/${entityType}/${entityId}`;

    const response = await ApiService.get(url);
    const data = response.data.map((item: any) => new CommentModel(item));
    return data;
  },

  async postComment(model: PostCommentModel): Promise<CommentModel> {
    const url = `comments/${model.entityType}/${model.entityId}`;

    const response = await ApiService.post(url, model);
    const newComment = new CommentModel(response.data);
    return newComment;
  }
};

export default commentService;

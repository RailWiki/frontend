import UserModel from '../User';

export default class CommentModel {
  public id = 0;

  public entityType = '';
  public entityId = 0;

  public createdOn = '';
  public updatedOn: string | null = null;

  public user: UserModel | null = null;

  public commentText = '';

  public flaggedOn: string | null = null;
  public flagUserId: number | null = null;
  public flagReason: string | null = null;

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);

      this.user = new UserModel(data.user);
    }
  }
};

export class PostCommentModel {
  public entityType = '';
  public entityId = 0;

  public commentText = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
};

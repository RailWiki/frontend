import UserModel from '../User';
import AlbumModel from './Album';

export class PhotoFilesModel {
  public original = '';
  public small = '';
  public medium = '';
  public large = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export default class PhotoModel {
  public id = 0;
  public album: AlbumModel | null = null;
  public user: UserModel | null = null;
  public author = '';
  public locationName?: string;
  public locationId?: number;
  public title = '';
  public description?: string;
  public filename = '';
  public photoDate = '';
  public uploadDate = '';
  public viewCount = 0;
  public files: PhotoFilesModel = new PhotoFilesModel();

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
      this.album = new AlbumModel(data.album);
      this.user = new UserModel(data.user);
      this.files = new PhotoFilesModel(data.files);
    }
  }
}

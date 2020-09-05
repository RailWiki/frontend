import AlbumModel from './Album';
import UserModel from '../User';

export class PhotoFilesModel {
  public original: string = '';
  public small: string = '';
  public medium: string = '';
  public large: string = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export default class PhotoModel {
  public id: number = 0;
  public albumId: number = 0;
  public album: AlbumModel | null = null;
  public userId: number = 0;
  public userName: string | null = null;
  public author: string = '';
  public locationName?: string;
  public locationId?: number;
  public title: string = '';
  public description?: string;
  public filename: string = '';
  public photoDate: string = '';
  public uploadDate: string = '';
  public viewCount: number = 0;
  public files: PhotoFilesModel = new PhotoFilesModel();

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
      this.album = new AlbumModel(data.album);
      this.files = new PhotoFilesModel(data.files);
    }
  }
}

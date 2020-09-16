import ApiService from './api.service';
import AlbumModel from '../models/photos/Album';

const albumService = {
  async getUserAlbums(userId: number): Promise<AlbumModel[]> {
    try {
      const response = await ApiService.get(`users?userId=${userId}`);

      const albums = response.data.map((x: any) => new AlbumModel(x));

      return albums;
    } catch (err) {
      throw new Error(err.response.data);
    }
  },

  async getCurrentUserAlbums(): Promise<AlbumModel[]> {
    try {
      const response = await ApiService.get('albums/mine');

      const albums = response.data.map((x: any) => new AlbumModel(x));
      return albums;
    } catch (err) {
      throw new Error(err.response.data);
    }
  },

  async getById(id: number): Promise<AlbumModel> {
    return ApiService.get(`albums/${id}`).then((response: any) => {
      const album = new AlbumModel(response.data);
      return album;
    });
  },

  async create(album: AlbumModel): Promise<AlbumModel> {
    return ApiService.post('albums', album).then((response: any) => {
      const newAlbum = new AlbumModel(response.data);
      return newAlbum;
    });
  },

  async update(album: AlbumModel): Promise<AlbumModel> {
    // Clear the user model so ASP.NET Core doesn't balk at it
    album.user = undefined;

    return ApiService.put(`albums/${album.id}`, album).then((response: any) => {
      album = new AlbumModel(response.data);
      return album;
    });
  }
};

export default albumService;

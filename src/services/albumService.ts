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

  async create(album: AlbumModel): Promise<AlbumModel> {
    return ApiService.post('albums', album).then((response: any) => {
      const newAlbum = new AlbumModel(response.data);
      return newAlbum;
    })
  },

  async update(album: AlbumModel): Promise<AlbumModel> {
    return ApiService.put(`albums/${album.id}`, album).then((response: any) => {
      album = new AlbumModel(response.data);
      return album;
    });
  }
};

export default albumService;

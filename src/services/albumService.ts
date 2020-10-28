import ApiService from './api.service';
import AlbumModel, { WriteAlbumModel } from '../models/photos/Album';
import { AxiosResponse } from 'axios';

const albumService = {
  async getUserAlbums(userId: number): Promise<AlbumModel[]> {
    const url = `albums?userId=${userId}`;

    return ApiService.get(url).then((response: AxiosResponse) => {
      const albums = response.data.map((x: any) => new AlbumModel(x));
      return albums;
    });
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

  async create(album: WriteAlbumModel): Promise<AlbumModel> {
    return ApiService.post('albums', album).then((response: any) => {
      const newAlbum = new AlbumModel(response.data);
      return newAlbum;
    });
  },

  async update(album: WriteAlbumModel): Promise<AlbumModel> {
    return ApiService.put(`albums/${album.id}`, album).then((response: any) => {
      const album = new AlbumModel(response.data);
      return album;
    });
  },

  async setAlbumCover(albumId: number, photoId: number) {
    const url = `albums/${albumId}/cover`;

    const data = {
      photoId
    };

    await ApiService.put(url, data);
  }
};

export default albumService;

import ApiService from './api.service';
import PhotoModel from '@/models/photos/Photo';
import { AxiosResponse, AxiosTransformer } from 'axios';

const photoService = {
  async getById(photoId: number): Promise<PhotoModel> {
    return ApiService.get(`photos/${photoId}`).then((response: AxiosResponse) => {
      const photo = new PhotoModel(response.data);
      return photo;
    });
  },

  async getByAlbumId(albumId: number): Promise<PhotoModel[]> {
    return ApiService.get(`photos?albumId=${albumId}`).then((response: AxiosResponse) => {
      const photos = response.data.map((x: any) => new PhotoModel(x));
      return photos;
    });
  },

  async getLatest(max: number): Promise<PhotoModel[]> {
    return ApiService.get(`photos/latest?max=${max}`).then((response: AxiosResponse) => {
      const photos = response.data.map((x: any) => new PhotoModel(x));
      return photos;
    });
  },

  async uploadPhotos(albumId: number, files: File[]): Promise<PhotoModel[]> {
    const formData = new FormData();
    formData.append('albumId', albumId.toString());

    Array
      .from(Array(files.length).keys())
      .map((x) => {
        formData.append('files', files[x], files[x].name);
      });

    return ApiService.post(`photos/multiple`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response: AxiosResponse) => {
      const photos = response.data.map((x: any) => new PhotoModel(x));
      return photos;
    });
  },

  async updatePhoto(photo: PhotoModel): Promise<void> {
    const data = {
      ...photo
    };

    // Null these out otherwise the API will try to validate them
    data.album = null;

    return ApiService.put(`photos/${photo.id}`, data).then((response: AxiosResponse) => {
      // Nothing to do?
    });
  }
};

export default photoService;

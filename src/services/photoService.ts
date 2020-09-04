import ApiService from './api.service';
import PhotoModel from '@/models/photos/Photo';
import { AxiosResponse } from 'axios';

const photoService = {
  async getById(albumId: number, photoId: number): Promise<PhotoModel> {
    return ApiService.get(`albums/${albumId}/photos/${photoId}`).then((response: AxiosResponse) => {
      const photo = new PhotoModel(response.data);
      return photo;
    })
  },

  async getByAlbumId(albumId: number): Promise<PhotoModel[]> {
    return ApiService.get(`albums/${albumId}/photos`).then((response: AxiosResponse) => {
      const photos = response.data.map((x: any) => new PhotoModel(x))
      return photos;
    });
  },

  async uploadPhotos(albumId: Number, files: Array<File>): Promise<PhotoModel[]> {
    console.log(`Upload photos to ${albumId}`, files);

    let formData = new FormData();

    Array
      .from(Array(files.length).keys())
      .map(x => {
        console.log('adding file to form data');
        formData.append('files', files[x], files[x].name);
      });

    console.log('form data', formData.get('files'));

    return ApiService.post(`albums/${albumId}/photos/multiple`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response: AxiosResponse) => {
      const photos = response.data.map((x: any) => new PhotoModel(x));
      return photos;
    });
  }
};

export default photoService;

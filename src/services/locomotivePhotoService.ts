import Api from './api.service';
import { AxiosResponse } from 'axios';
import LocomotivePhotoModel from '@/models/photos/LocomotivePhoto';
import PhotoModel from '@/models/photos/Photo';

const locomotivePhotoService = {
  async getByPhotoId(photoId: number): Promise<LocomotivePhotoModel[]> {
    const url = `photos/${photoId}/locomotives`;
    return Api.get(url).then((response: AxiosResponse) => {
      const models = response.data.map((x: any) => new LocomotivePhotoModel(x));
      return models;
    });
  },

  async getByLocomotiveId(locoId: number): Promise<PhotoModel[]> {
    const url = `locomotives/${locoId}/photos`;

    return Api.get(url).then((response: AxiosResponse) => {
      const photos = response.data.map((x: any) => new PhotoModel(x));
      return photos;
    });
  },

  async update(photoId: number, locomotiveIds: number[]) {
    const url = `photos/${photoId}/locomotives`;
    const data = {
      locomotiveIds
    };

    return Api.put(url, data);
  }
};

export default locomotivePhotoService;

import LocomotiveModel from '../rosters/Locomotive';
import PhotoModel from './Photo';

export default class LocomotivePhotoModel {
  public id: number = 0;

  public photoId: number = 0;
  public locomotiveId: number = 0;

  public photo?: PhotoModel;
  public locomotive?: LocomotiveModel

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

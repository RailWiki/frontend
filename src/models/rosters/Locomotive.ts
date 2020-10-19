import RosterItemModel from './RosterItem';
import FilterModel from '../FilterModel';

export default class LocomotiveModel extends RosterItemModel {
  public modelNumber: string | null = null;
  public serialNumber: string | null = null;
  public frameNumber: string | null = null;
  public builtAs: string | null = null;

  public buildMonth: number | null = null;
  public buildYear: number | null = null;

  constructor(data: any | null) {
    super(data);

    Object.assign(this, data);
  }
}

export class FilterLocomotivesModel extends FilterModel {
  public roadId: number | null = null;
  public roadNumber: string | null = null;
  public modelNumber: string | null = null;
  public serialNumber: string | null = null;

  public page = 1;
}

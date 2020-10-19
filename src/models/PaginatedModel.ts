import { AxiosResponse } from 'axios';

export default class PaginatedModel<TModel> {
  public data: TModel[] = new Array<TModel>();

  public total = 0;
  public pageSize = 0;
  public currentPage = 0;
  public pageCount = 0;

  public hasPrevious = false;
  public hasNext = false;

  constructor(apiResponse?: AxiosResponse) {
    if (!apiResponse) {
      return;
    }

    this.total = parseInt(apiResponse.headers['x-pagination-total']);
    this.pageSize = parseInt(apiResponse.headers['x-pagination-pagesize']);
    this.currentPage = parseInt(apiResponse.headers['x-pagination-page']);
    this.pageCount = parseInt(apiResponse.headers['x-pagination-pagecount']);
    this.hasPrevious = apiResponse.headers['x-pagination-hasprevious'] === 'true';
    this.hasNext = apiResponse.headers['x-pagination-hasnext'] === 'true';
  }
}

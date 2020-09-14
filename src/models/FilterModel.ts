export default class FilterModel {
  public toQueryString(): string {
    const query = Object.keys(this)
      .filter(x => this[x] !== null)
      .map(key => `${key}=${this[key]}`)
      .join('&');
    return query;
  }
}

export interface ITransformer<T> {
  /**
   * transform one type to another
   * @param type1
   */
  transform(type1: T): any;
}

export default class ClassMethod {

  constructor(data) {
    this.data = data;
  }

  /**
   * Return child nodes to ast-traverse
   * return has to ba an array!
   * @returns {[*]}
   */
  getChildNodes() {
    // we don't need to get anything from inside classMethod
    // return null then
    return null;
  }

}

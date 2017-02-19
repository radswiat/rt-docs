export default class ExportDefaultDeclaration {

  constructor(data) {
    this.data = data;
  }

  /**
   * Return child nodes to ast-traverse
   * return has to ba an array!
   * @returns {[*]}
   */
  getChildNodes() {
    // return sub node from data.declaration
    // and as its not array, we have to return array as this is expected by traverse
    return [this.data.declaration];
  }

}

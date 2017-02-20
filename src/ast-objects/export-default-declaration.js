export default class ExportDefaultDeclaration {

  constructor(data) {
    this.type = 'export-default';
    // export has a comment, that should belong to child element instead,
    // lets just pass it over into the child
    data.declaration.leadingComments = data.leadingComments;
    this.childes = [data.declaration];
  }

  insertChildNode(node) {
    this.childes = node;
  }

  /**
   * Return child nodes to ast-traverse
   * return has to ba an array!
   * @returns {[*]}
   */
  getChildNodes() {
    // return sub node from data.declaration
    // and as its not array, we have to return array as this is expected by traverse
    return this.childes;
  }

}

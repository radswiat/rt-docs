import AstObject from './ast-object';

export default class ClassMethod extends AstObject {

  static supportedTags = ['desc', 'alias'];

  constructor(data) {
    super();
    this.type = 'class-method';
    this.name = data.key.name;
    this.static = data.static;
    this.kind = data.kind;
    this.params = data.params;
    this.comments = this.parseComments(data.leadingComments[0].value);
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

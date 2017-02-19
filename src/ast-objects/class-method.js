export default class ClassMethod {

  static supportedTags = ['desc', 'alias'];

  constructor(data) {
    this.data = data;
    this.parseComments();
  }

  parseComments() {
    let comments = this.data.leadingComments[0].value;

    // lets clean a comment block
    comments = comments.replace(/\*/g, '');
    console.log(comments);

    // let r = comments.match(/((\@)([A-Za-z]){0,})((.(.|[\r\n])(?!(\@))){0,})/g);
    let r = comments.match(/((\@)([A-Za-z]){0,})(((.|[\r\n])(?!(\@))){0,})/g);
    console.log(r);
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

export default class ClassDeclaration {

  constructor(data) {
    this.data = data;
  }

  insertChildNode(node) {
    this.data.body.body = node;
  }

  getChildNodes() {
    // class declaration can have child nodes
    // first child is classBody
    // we don't need it, so we gonna return a body from classBody
    // which is as follow ( body.body )
    return this.data.body.body;
  }

}

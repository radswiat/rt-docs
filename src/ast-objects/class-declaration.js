import AstObject from './ast-object';

export default class ClassDeclaration extends AstObject {

  constructor(data) {
    super();
    this.type = 'class';
    this.name = data.id.name;
    this.extends = data.superClass.name;
    this.childes = data.body.body;
    this.comments = this.parseComments(data.leadingComments[0].value);
    // if we want to store oryginal data
    // this.data = data;
  }

  insertChildNode(node) {
    this.childes = node;
  }

  getChildNodes() {
    // class declaration can have child nodes
    // first child is classBody
    // we don't need it, so we gonna return a body from classBody
    // which is as follow ( body.body )
    return this.childes;
  }

}

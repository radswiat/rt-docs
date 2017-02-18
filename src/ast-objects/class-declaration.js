export default class ClassDeclaration {

  constructor(data) {
    this.data = data;
  }

  getChildNodes() {
    // import declaration doest have any inner nodes
    return this.data.body;
  }

}
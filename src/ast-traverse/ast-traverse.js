import { camelToDash } from '../utils';

export default class AstTraverse {

  /**
   * Ast traverse use only ast.program.body to traverse the dom
   * @param body
   */
  constructor(body) {
    this.body = body;
  }

  traverse() {
    this.body.forEach((node) => {

      let obj = new (require(`../ast-objects/${camelToDash(node.type)}`).default)(node);
      console.log(node.type);
      let child = obj.getChildNodes();
      console.log(child);
    });
  }

}
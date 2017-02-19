import { camelToDash } from '../utils';
import chalk from 'chalk';

export default class AstTraverse {

  /**
   * Ast traverse use only ast.program.body to traverse the dom
   * @param body
   */
  constructor(body) {
    this.body = body;
    this.traverse(body);
  }

  traverse(node) {
    node.forEach((child) => {
      let obj;
      try {
        obj = new (require(`../ast-objects/${camelToDash(child.type)}`).default)(child);
      } catch (err) {
        console.log(chalk.red.bold(
          `ast-object does not exists in: src/ast-objects/${camelToDash(child.type)}`
        ));
      }
      console.log(child.type);
      let subChild = obj.getChildNodes();
      if (subChild && subChild.length) {
        this.traverse(subChild);
      }
    });
  }

}

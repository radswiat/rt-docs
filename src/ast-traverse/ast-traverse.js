import { camelToDash } from '../utils';
import { log } from '../utils';
import chalk from 'chalk';

export default class AstTraverse {

  /**
   * Ast traverse use only ast.program.body to traverse the dom
   * @param body
   */
  constructor(body) {
    this.body = body;
    let done = this.traverse(body);
    console.log(chalk.green.bold('---------------'));
    log(done);
  }

  traverse(node) {
    let traverseNode = [];
    node.forEach((child, index) => {
      let obj;
      try {
        obj = new (require(`../ast-objects/${camelToDash(child.type)}`).default)(child);
      } catch (err) {
        console.log(chalk.red.bold(
          `ast-object does not exists in: src/ast-objects/${camelToDash(child.type)}`
        ));
      }
      if (typeof obj.data !== 'undefined') {
        traverseNode[index] = obj;
        let subChild = obj.getChildNodes();
        if (subChild && subChild.length) {
          let s = this.traverse(subChild);
          obj.insertChildNode(s);
        }
      }
    });
    return traverseNode;
  }

}

import { camelToDash } from '../utils';
import chalk from 'chalk';

export default class AstTraverse {

  /**
   * Ast traverse use only ast.program.body to traverse the dom
   * @param body
   */
  constructor(body) {
    this.body = body;
  }

  traverse() {
    return this._traverse(this.body);
  }

  _traverse(node) {
    let traverseNode = [];
    node.forEach((child) => {
      let obj;
      try {
        obj = new (require(`../ast-objects/${camelToDash(child.type)}`).default)(child);
      } catch (err) {
        console.log(chalk.red.bold(
          `ast-object does not exists in: src/ast-objects/${camelToDash(child.type)}`
        ));
      }
      if (Object.keys(obj).length) {
        traverseNode.push(obj);
        let subChild = obj.getChildNodes();
        if (subChild && subChild.length) {
          let s = this._traverse(subChild);
          obj.insertChildNode(s);
        }
      }
    });
    return traverseNode;
  }

}

/**
 * What is ExpressionStatement ?
 * - Its used to assign a static into a class
 * - like: static propTypes ( ClassName.propTypes )
 * Why we need it ?
 * - to obtain propTypes
 */
export default class ExpressionStatement {

  constructor(data) {

    // we don't care about expressionStatement's
    // so lets create fake ast-object - props
    this.type = 'prop-types';

    this.names = data.expression.right.properties.map((prop) => {
      return {
        name: prop.key.name,
        comments: prop.leadingComments
      };
    });
    // todo: this works for MemberExpression only,
    // which is a object, but static can be any type ?
    this.of = data.expression.left.object.name;

  }

  getChildNodes() {
    // we don't need to return anything,
    // as we traverse this node manually in here, just to return static props
    return null;
  }

}

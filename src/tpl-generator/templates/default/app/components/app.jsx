import React from 'react';
import Block from './comment-blocks/block.jsx';

function objToArr(obj) {
  return Object.keys(obj).map((key) => { return obj[key]; });
}

const docs = objToArr(APP_DATA.docs);

/**
 * React Main app
 * @desc
 * App is a wrapper for the whole app,
 * its used for layout purpose at least for now,
 * but will be extended in the future.
 */
export default class App extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  };

  /**
   * Render
   * @protected
   * @return {ReactElement} markup
   */
  render() {

    let currentPageDocs = docs.filter((ast) => {
      if (ast.route === this.context.router.location.pathname) {
        return true;
      }
      return false;
    })[0];

    return (
      <div className="layout-column flex">
        <Block nodes={currentPageDocs.ast} />
      </div>
    );
  }
}

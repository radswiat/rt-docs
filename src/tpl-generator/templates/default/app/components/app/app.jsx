/* global APP_DATA */
import React from 'react';
import Block from '../block/block.jsx';
import Navigation from '../navigation/navigation.jsx';
import Header from '../header/header.jsx';
import { objToArr } from '../../core/utils.jsx';
import CSSModules from 'react-css-modules';

import css from './app.scss';

// obtain GLOBAL data from webpack
// it has to be parsed to array due to
// webpack issue ( it converts array into object without any reasons )
// - it holds all AST docs data
const astData = objToArr(APP_DATA.astData);

/**
 * React Main app
 * @desc
 * App is a wrapper for the whole app,
 * its used for layout purpose at least for now,
 * but will be extended in the future.
 */
@CSSModules(css)
export default class App extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  /**
   * Render
   * @protected
   * @return {ReactElement} markup
   */
  render() {

    // astData contains data about every single page being rendered,
    // to find out current page we need to compare ast.route with a current router location
    let currentPageAstData = astData.filter((ast) => {
      if (ast.route === this.context.router.location.pathname) {
        return true;
      }
      return false;
    })[0];

    return (
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="../styles.css" />
        </head>
        <body>
          <div styleName="header-container" className="layout-column flex">
            <Header nodes={astData} />
          </div>
          <div className="layout-row flex md-stretch">
            <div styleName="navigation-container" className="layout-column md-stretch">
              <Navigation nodes={astData} />
            </div>
            <div styleName="content-container" className="layout-column flex md-stretch">
              <Block nodes={currentPageAstData.ast} />
            </div>
          </div>
        </body>
      </html>
    );
  }
}

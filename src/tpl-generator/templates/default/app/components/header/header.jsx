import React from 'react';
import CSSModules from 'react-css-modules';

import css from './header.scss';

@CSSModules(css)
export default class Header extends React.Component {

  static propTypes = {
    nodes: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="md-toolbar">
        <div className="md-toolbar-tools">
          RT-docs
        </div>
      </div>
    );
  }
}

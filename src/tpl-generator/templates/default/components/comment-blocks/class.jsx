import React from 'react';
import Block from './block.jsx';

export default class Class extends React.Component {

  static propTypes = {
    node: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="layout-column flex">
        <h2>Class</h2>
        <If condition={this.props.node.childes}>
          <Block nodes={this.props.node.childes} />
        </If>
      </div>
    );
  }
}

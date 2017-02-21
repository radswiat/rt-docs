import React from 'react';
import Block from './block.jsx';

export default class ExportDefault extends React.Component {

  static ReactProps = {
    node: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="layout-column flex">
        <h2>ExportDefault</h2>
        <If condition={this.props.node.childes}>
          <Block nodes={this.props.node.childes} />
        </If>
      </div>
    );
  }
}

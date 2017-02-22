import React from 'react';
import Block from '../block/block.jsx';
import { objToArr } from '../../core/utils.jsx';

export default class ClassMethod extends React.Component {

  static propTypes = {
    node: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="layout-column flex">
        <h2>method {this.props.node.name}</h2>
        {objToArr(this.props.node.comments).map((comment, key) => {
          return (
            <p key={key}>
              <b>{comment.type}</b>
              {comment.content}
            </p>
          );
        })}
        <If condition={this.props.node.childes}>
          <Block nodes={this.props.node.childes} />
        </If>
      </div>
    );
  }
}

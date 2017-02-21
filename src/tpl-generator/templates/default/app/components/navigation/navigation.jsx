import React from 'react';
import path from 'path';

export default class Navigation extends React.Component {

  static propTypes = {
    nodes: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <h3>Navigation</h3>
          <ul>
          { this.props.nodes &&
            this.props.nodes.map((node, key) => {
              return (
                <li key={key}><a href={`../${node.route}/index.html`}>{node.route}</a></li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

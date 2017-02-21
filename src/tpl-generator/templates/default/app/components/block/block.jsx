import React from 'react';
import ClassMethod from '../comment-blocks/class-method.jsx';
import Class from '../comment-blocks/class.jsx';
import ExportDefault from '../comment-blocks/export-default.jsx';

function objToArr(obj) {
  return Object.keys(obj).map((key) => { return obj[key]; });
}

export default class Block extends React.Component {

  static propTypes = {
    nodes: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    this.setState({
      nodes: objToArr(this.props.nodes)
    });
  }

  render() {
    return (
      <div>
        { this.state.nodes &&
          this.state.nodes.map((child, key) => {
            return (
              <div key={key}>
                <Choose>
                  <When condition={child.type === 'export-default'}>
                    <ExportDefault node={child} />
                  </When>
                  <When condition={child.type === 'class'}>
                    <Class node={child} />
                  </When>
                  <When condition={child.type === 'class-method'}>
                    <ClassMethod node={child} />
                  </When>
                  <Otherwise>
                    none
                  </Otherwise>
                </Choose>
              </div>
            );
          })
        }
      </div>
    );
  }
}

import React from 'react';

/**
 * Test
 * @desc
 * sadsada
 */
export default class Test2 extends React {

  /**
   * propTypes
   * @property {children} ReactElement
   */
  static propTypes = {
    // children test loooooong2
    children: React.PropTypes.element,
    // nodes looooong2
    nodes: React.PropTypes.string
  };

  /**
   * Render react
   * @protected
   * @desc
   * This is some description with <b>html tag support</b>
   */
  render() {
    return (
      <div>console.log{Test.propTypes}</div>
    );
  }

}


import React from 'react';

/**
 * Test
 * @desc
 * sadsada
 */
export default class Test3 extends React {

  /**
   * propTypes
   * @property {children} ReactElement
   */
  static propTypes = {
    // children test loooooong3
    children: React.PropTypes.element
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


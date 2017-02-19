import React from 'react';

/**
 * React Main app
 * @desc
 * App is a wrapper for the whole app,
 * its used for layout purpose at least for now,
 * but will be extended in the future.
 */
export default class App extends React.Component {

  /**
   * Render
   * @protected
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="layout-column flex">
        <div className="layout-row flex stretch">
          asdasd
        </div>
      </div>
    );
  }
}

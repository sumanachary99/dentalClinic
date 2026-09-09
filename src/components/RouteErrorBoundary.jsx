import { Component } from 'react';

/**
 * Without this, a route chunk that fails to load unmounts the entire app and
 * leaves a blank page — no header, no nav, no way back.
 */
export default class RouteErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="route-error">
        <h2>This page didn&apos;t load</h2>
        <p>Please check your connection and try again.</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    );
  }
}

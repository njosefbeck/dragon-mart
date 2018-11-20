import React from 'react';
import './Alert.css';

class Alert extends React.Component {
  renderMessage() {
    if (this.props.hash === '#success') {
      return `Thanks for your purchase!`;
    } else if (this.props.hash === '#cancelled') {
      return `We're sorry you decided to cancel. Feel free to shop again!`;
    } else {
      return '';
    }
  }

  render() {
    return (
      <section className="Alert" onClick={e => this.props.closeAlert(e)} role="link">
      <p className="message">{this.renderMessage()}</p>
      <p className="instructions">Click to close</p>
      </section>
    );
  }
};

export default Alert;
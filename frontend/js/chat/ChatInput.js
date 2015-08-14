/** @jsx React.DOM **/
var React = require('react/addons');

/**
 * Component for the input for joining the lobby with a given player name
 */
var ChatInput = React.createClass({
  getInitialState: function() {
    return {
      newMessage: ''
    };
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var message = this.state.newMessage;
    this.props.onNewMessage(message);
    this.setState({ newMessage: '' });
  },
  handleChange: function(event) {
    this.setState({ newMessage: event.target.value });
  },
  render: function() {
    return (
      <div className={ this.props.isChatInputDisabled ? 'opacity-low': '' }>
        <form onSubmit={this.handleSubmit}>
          <label>Send a message</label>
          <input disabled={this.props.isChatInputDisabled} type="text" className="chatinput" value={this.state.newMessage} onChange={this.handleChange} />
        </form>
      </div>
    );
  }

});

module.exports = ChatInput;

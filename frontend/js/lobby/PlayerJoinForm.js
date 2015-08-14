/** @jsx React.DOM **/
var React = require('react/addons');

/**
 * Component for the input for joining the lobby with a given player name
 */
var PlayerJoinForm = React.createClass({

  getInitialState: function() {
    return {
      newPlayerName: ''
    };
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var name = this.state.newPlayerName;
    this.props.onAddPlayer(name);
    this.setState({ newPlayerName: '' });
  },
  handleChange: function(event) {
    this.setState({ newPlayerName: event.target.value });
  },
  render: function() {
    return (
      <div className={ this.props.hidePlayerJoinForm ? 'hide-element': '' }>
        <form onSubmit={this.handleSubmit}>
          <label>Join game</label>
          <input type="text" className="playerjoininput" value={this.state.newPlayerName} onChange={this.handleChange} />
        </form>
      </div>
    );
  }

});

module.exports = PlayerJoinForm;

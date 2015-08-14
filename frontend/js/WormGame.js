/** @jsx React.DOM **/
var React = require('react/addons');
var GameLobby = require('./lobby/GameLobby.js');
var ChatContainer = require('./chat/ChatContainer.js');

/**
 * The main component for the game lobby consisting of user list, input fields and chat
 */
var WormGame = React.createClass({
  getInitialState: function() {
    return {
      currentUser: null,
      isPlayerJoined: false,
      socketInstance: io()
    };
  },
  componentDidMount: function() {

  },
  setPlayerJoined: function(playerJoined) {
    this.setState({ isPlayerJoined: playerJoined });
  },
  setCurrentUser: function(current) {
    this.setState({ currentUser: current });
  },
  render: function() {
    return (
      <div className="wormgamecontainer">
        <div className="col s3 gamelobbycol">
          <GameLobby setCurrentUser={this.setCurrentUser} setPlayerJoined={this.setPlayerJoined} isPlayerInputHidden={this.state.isPlayerJoined} socketInstance={this.state.socketInstance}/>
        </div>
        <div className="col s9 contentcol">
          <ChatContainer currentUser={this.state.currentUser} isChatInputDisabled={!this.state.isPlayerJoined} socketInstance={this.state.socketInstance}/>
        </div>
      </div>
    );
  }
});

module.exports = WormGame;

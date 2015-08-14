/** @jsx React.DOM **/
var React = require('react/addons');
var UserList = require('./UserList');
var PlayerJoinForm = require('./PlayerJoinForm');

/**
 * The main component for the game lobby consisting of user list, input fields and chat
 */
var GameLobby = React.createClass({
  getInitialState: function() {
    return {
      users: []
    };
  },
  componentDidMount: function() {
    this.props.socketInstance.on('players:get', this.handleGetPlayers);
    this.props.socketInstance.on('player:joined', this.playerJoined);
  },
  playerJoined: function(data) {
    console.log('New player joined! ');
    console.log(data);

    var newState = React.addons.update(this.state, {
        users : {
          $push : [data]
        }
    });

    this.setState(newState);
  },
  handleGetPlayers: function(playerData) {
    this.setState({ users: playerData });
  },
  handleAddPlayer: function(newPlayerName) {
    var that = this;

    this.props.socketInstance.emit('player:add', { name: newPlayerName }, function(data, result) {
      if (!result) {
        console.log('Player already joined the lobby!');
      } else {
        that.playerJoined(data);
        that.props.setPlayerJoined(true);
        that.props.setCurrentUser(data);
      }
    });
  },
  render: function() {
    return (
      <div className="gamelobby">
        <UserList users={this.state.users} />
        <PlayerJoinForm onAddPlayer={this.handleAddPlayer} hidePlayerJoinForm={this.props.isPlayerInputHidden} />
      </div>
    );
  }
});

module.exports = GameLobby;

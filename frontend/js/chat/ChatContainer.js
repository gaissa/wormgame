/** @jsx React.DOM **/
var React = require('react/addons');
var ChatArea = require('./ChatArea');
var ChatInput = require('./ChatInput');

/**
 * Component for the input for joining the lobby with a given player name
 */
var ChatContainer = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    };
  },
  componentDidMount: function() {
    this.props.socketInstance.on('chat:messagesent', this.messageSent);
  },
  messageSent: function(data) {
    console.log('New message sent! ');
    console.log(data);

    var newState = React.addons.update(this.state, {
        messages : {
          $push : [data]
        }
    });
    this.setState(newState);
  },
  handleNewMessage: function(newMessage) {
    var that = this;

    this.props.socketInstance.emit('chat:newmessage', { message: newMessage, sender: that.props.currentUser.name, timestamp: moment(new Date()).format('h:mm:ss') }, function(data, result) {
      if (!result) {
        console.log('Error while sending a message!');
      } else {
        that.messageSent({ id: ui_guid_generator(), message: data.message, sender: data.sender, timestamp: moment(new Date()).format('h:mm:ss')});
      }
    });
  },
  render: function() {
    return (
      <div className="chatcontainer">
        <ChatArea messages={this.state.messages}/>
        <ChatInput onNewMessage={this.handleNewMessage} isChatInputDisabled={this.props.isChatInputDisabled}/>
      </div>
    );
  }

});

module.exports = ChatContainer;

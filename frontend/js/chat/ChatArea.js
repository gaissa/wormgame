/** @jsx React.DOM **/
var React = require('react/addons');

/**
 * Component for the input for joining the lobby with a given player name
 */
var ChatArea = React.createClass({
  getInitialState: function() {
    return {

    };
  },
  render: function() {
    var renderMessage = function(messageObj) {
      return <li key={messageObj.id}><div className="col s2 msg sender"><span className="msgitem">{messageObj.sender}:</span></div><div className="col s8 msg messagecontent"><span className="msgitem">{messageObj.message}</span></div><div className="col s2 msg messagecontent"><span className="msgitem">{messageObj.timestamp.toString()}</span></div></li>
    };

    return (
      <div className="collection messages">
        <ul className="messagelist">{ this.props.messages.map(renderMessage) }</ul>
      </div>
    );
  }

});

module.exports = ChatArea;

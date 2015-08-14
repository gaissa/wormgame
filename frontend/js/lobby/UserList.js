/** @jsx React.DOM **/
var React = require('react/addons');

/**
 * Component for listing players in the lobby
 */
var UserList = React.createClass({
  getDefaultProps: function() {
    return {
      users: []
    };
  },
  render: function() {
    var renderUser = function(user) {
      return <li key={user.id}> <a className="collection-item" href="!#">{user.name}</a> </li>
    };

    return (
      <div className="collection users">
        <h3> Players </h3>
        <ul>{ this.props.users.map(renderUser) }</ul>
      </div>
    );
  }

});

module.exports = UserList;

var React = require('react');
var Breadcrumbs = React.createClass({

  propTypes: {
    breadcrumbs: React.PropTypes.array,
  },

  renderBreadcrumbs: function() {
    var breadcrumbs = this.props.breadcrumbs || {};
    return breadcrumbs.map((item, i) => {
      return (
        <li key={i}>{item.catalogName}</li>
      );
    });
  },

  render: function() {
    return (
      <ul className="breadcrumbs">{this.renderBreadcrumbs()}</ul>
    );
  }

});

module.exports = Breadcrumbs;

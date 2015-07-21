'use strict';

var React = require('react');

var ProductListItem = React.createClass({

  propTypes: {
    brand: React.PropTypes.string,
    price: React.PropTypes.number,
    productId: React.PropTypes.number.isRequired,
    description: React.PropTypes.string,
    images: React.PropTypes.object
  },

  getInitialState() {
    // image keys => (sm, lg, xl)
    var images = this.props.images || {};
    return {
      currentImage: images.sm
    };
  },

  render() {
    var price = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(this.props.price);
    return (
      <li className="grid-cell text-center">
        <div className="proudctList--item" data-product-id={this.props.productId} onMouseEnter={this.props.onProductHeroChange}>
          <img src={this.state.currentImage} alt={this.props.brand} />
          <p className="proudctList--description">{this.props.description}</p>
          <p className="proudctList--price"><strong>{price}</strong></p>
          <button>View More</button>
        </div>
      </li>
    );
  }
});

module.exports = ProductListItem;

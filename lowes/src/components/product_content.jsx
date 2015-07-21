'use strict';

var React = require('react');
var ProductList = require('product_list');
var ProductHero = require('product_hero');

var ProductContent = React.createClass({
  propTypes: {
    productsList: React.PropTypes.array,
    productHero: React.PropTypes.object,
    onProductHeroChange: React.PropTypes.func,
    onAddToCartClick: React.PropTypes.func
  },

  render() {
    return (
      <div className="contentWrapper">
        <ProductHero productHero={this.props.productHero} onAddToCartClick={this.props.onAddToCartClick} />
        <ProductList productsList={this.props.productsList} onProductHeroChange={this.props.onProductHeroChange} />
      </div>
    );
  }
});

module.exports = ProductContent;

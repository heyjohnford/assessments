'use strict';

var React = require('react');
var _ = require('lodash');
var Breadcrumbs = require('breadcrumbs');
var ProductContent = require('product_content');
var ProductHero = require('product_hero');

var ProductParent = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    author: React.PropTypes.string,
    products: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      productHero: {}
    };
  },

  getproductHero() {
    var products = this.props.products || {},
      productsList = products.ProductsList || [];

    this.setState({productHero: productsList[0]});
  },

  componentWillMount () {
    this.getproductHero();
  },

  onProductHeroChange(event) {
    var id = parseInt(event.target.getAttribute('data-product-id'), 10);
    this.updateProductInfoData(id);
  },

  onAddToCartClick(event) {
    confirm(event);
  },

  updateProductInfoData(id) {
    var products = this.props.products || {},
      productsList = products.ProductsList || [],
      newHero = _.find(productsList, { 'title': id });

    this.setState({productHero: newHero});
  },

  render() {
    var products = this.props.products || {},
      breadcrumbs = products.Breadcrumbs || [],
      productsList = products.ProductsList || [];

    return (
      <div className="container">
        <header className="header">
          <div className="grid grid--1of4">
            <div className="grid-cell">
              <img className="mobile--image-fit" src="/images/lowes-logo.svg" alt="Logo" />
            </div>
            <div className="grid-cell navigation">
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
          </div>
        </header>
        <section className="content">
          <ProductContent
            productsList={productsList}
            productHero={this.state.productHero}
            onProductHeroChange={this.onProductHeroChange}
            onAddToCartClick={this.onAddToCartClick} />
        </section>
        <footer className="footer text-center">
          <img className="profilePic" src="https://pbs.twimg.com/profile_images/587619661157683200/dqW2BbMa_200x200.jpg" alt="Twitter Pic" />
          <p><small>Built by <a href="http://twitter.com/johnamiahford" target="_blank">{this.props.author}</a></small></p>
        </footer>
      </div>
    );
  }
});

module.exports = ProductParent;

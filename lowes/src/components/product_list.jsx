'use strict';

var React = require('react');
var ProductListItem = require('product_list_item');

var ProductList = React.createClass({

  propTypes: {
    productsList: React.PropTypes.array.isRequired,
    onProductHeroChange: React.PropTypes.func
  },

  renderProductListItems() {
    var productsList = this.props.productsList || [];
    return productsList.map((product, i) => {
      var productInfo = product.ProductInfo || {},
        description = productInfo.p_product_brand_name + " " + productInfo.p_product_description;

      return (
        <ProductListItem
          key={i}
          brand={productInfo.p_product_brand_name}
          productId={product.title}
          price={productInfo.p_product_price}
          description={description}
          images={product.imageURLs}
          onProductHeroChange={this.props.onProductHeroChange} />
      );
    });

  },

  render() {
    return (
      <div className="proudctList">
        <ul className="grid grid--1of3 grid--fit">
          {this.renderProductListItems()}
        </ul>
      </div>
    );
  }
});

module.exports = ProductList;

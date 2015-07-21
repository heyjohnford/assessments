var React = require('react');
var Breadcrumbs = React.createClass({displayName: "Breadcrumbs",

  propTypes: {
    breadcrumbs: React.PropTypes.array,
  },

  renderBreadcrumbs: function() {
    var breadcrumbs = this.props.breadcrumbs || {};
    return breadcrumbs.map((item, i) => {
      return (
        React.createElement("li", {key: i}, item.catalogName)
      );
    });
  },

  render: function() {
    return (
      React.createElement("ul", {className: "breadcrumbs"}, this.renderBreadcrumbs())
    );
  }

});

module.exports = Breadcrumbs;

'use strict';

var React = require('react');
var ProductParent = require('./components/product_parent');

var products = document.getElementById('lowesProductData').value;

React.render(
  React.createElement(ProductParent, {
    title: "Welcome to the Lowes Assessment!", 
    author: "@johnamiahford", 
    products: JSON.parse(products)}),
  document.getElementById('react')
);

'use strict';

var React = require('react');
var ProductList = require('product_list');
var ProductHero = require('product_hero');

var ProductContent = React.createClass({displayName: "ProductContent",
  propTypes: {
    productsList: React.PropTypes.array,
    productHero: React.PropTypes.object,
    onProductHeroChange: React.PropTypes.func,
    onAddToCartClick: React.PropTypes.func
  },

  render() {
    return (
      React.createElement("div", {className: "contentWrapper"}, 
        React.createElement(ProductHero, {productHero: this.props.productHero, onAddToCartClick: this.props.onAddToCartClick}), 
        React.createElement(ProductList, {productsList: this.props.productsList, onProductHeroChange: this.props.onProductHeroChange})
      )
    );
  }
});

module.exports = ProductContent;

'use strict';

var React = require('react');

var ProductHero = React.createClass({displayName: "ProductHero",

  propTypes: {
    productHero: React.PropTypes.object,
    onAddToCartClick: React.PropTypes.func
  },

  addToCartClick(event) {
    var cartMessage = event.target.getAttribute("data-cart-message");
    this.props.onAddToCartClick(cartMessage);
  },

  renderSomeBullets(bullets) {
    return bullets.reduce((arr, item, i) => {
      // Grab just the first two bullets
      if (i < 2) {
        arr.push(React.createElement("li", {key: i, className: "productHero--bullet"}, item));
      }
      return arr;
    }, []);
  },

  render() {
    var productHero = this.props.productHero || {},
      productInfo = productHero.ProductInfo || {},
      images = productHero.imageURLs || {},
      image = images.lg,
      price = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(productInfo.p_product_price),
      bullets = (productInfo.p_product_bullets_json || {}).Value || [],
      cartMessage=`LOWES \n\nAdd ${productInfo.p_product_brand_name} ${productInfo.p_product_description} listed at ${price} to your shopping cart!`

    return (
      React.createElement("div", {className: "prodcutHero"}, 
        React.createElement("div", {className: "grid grid--full grid--fit"}, 
          React.createElement("div", {className: "grid-cell"}, 
            React.createElement("div", {className: "grid grid--1of3 grid--fit"}, 
              React.createElement("div", {className: "grid-cell"}, 
                React.createElement("img", {className: "mobile--image-fit", src: image, alt: productInfo.p_product_brand_name})
              ), 
              React.createElement("div", {className: "grid-cell"}, 
                React.createElement("div", {className: "prodcutHero--description"}, 
                  React.createElement("p", null, React.createElement("strong", null, productInfo.p_product_brand_name), " ", productInfo.p_product_description), 
                  React.createElement("ul", {className: "show-bullets"}, 
                    this.renderSomeBullets(bullets)
                  )
                )
              ), 
              React.createElement("div", {className: "grid-cell grid--fit-mobile text-center"}, 
                React.createElement("button", {className: "buy", onClick: this.addToCartClick, "data-cart-message": cartMessage}, "Add to Cart"), 
                React.createElement("p", {className: "productHero--price"}, React.createElement("strong", null, price))
              )
            )
          )
        )
      )
    );
  }
});

module.exports = ProductHero;

'use strict';

var React = require('react');
var ProductListItem = require('product_list_item');

var ProductList = React.createClass({displayName: "ProductList",

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
        React.createElement(ProductListItem, {
          key: i, 
          brand: productInfo.p_product_brand_name, 
          productId: product.title, 
          price: productInfo.p_product_price, 
          description: description, 
          images: product.imageURLs, 
          onProductHeroChange: this.props.onProductHeroChange})
      );
    });

  },

  render() {
    return (
      React.createElement("div", {className: "proudctList"}, 
        React.createElement("ul", {className: "grid grid--1of3 grid--fit"}, 
          this.renderProductListItems()
        )
      )
    );
  }
});

module.exports = ProductList;

'use strict';

var React = require('react');

var ProductListItem = React.createClass({displayName: "ProductListItem",

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
      React.createElement("li", {className: "grid-cell text-center"}, 
        React.createElement("div", {className: "proudctList--item", "data-product-id": this.props.productId, onMouseEnter: this.props.onProductHeroChange}, 
          React.createElement("img", {src: this.state.currentImage, alt: this.props.brand}), 
          React.createElement("p", {className: "proudctList--description"}, this.props.description), 
          React.createElement("p", {className: "proudctList--price"}, React.createElement("strong", null, price)), 
          React.createElement("button", null, "View More")
        )
      )
    );
  }
});

module.exports = ProductListItem;

'use strict';

var React = require('react');
var _ = require('lodash');
var Breadcrumbs = require('breadcrumbs');
var ProductContent = require('product_content');
var ProductHero = require('product_hero');

var ProductParent = React.createClass({displayName: "ProductParent",

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
      React.createElement("div", {className: "container"}, 
        React.createElement("header", {className: "header"}, 
          React.createElement("div", {className: "grid grid--1of4"}, 
            React.createElement("div", {className: "grid-cell"}, 
              React.createElement("img", {className: "mobile--image-fit", src: "/images/lowes-logo.svg", alt: "Logo"})
            ), 
            React.createElement("div", {className: "grid-cell navigation"}, 
              React.createElement(Breadcrumbs, {breadcrumbs: breadcrumbs})
            )
          )
        ), 
        React.createElement("section", {className: "content"}, 
          React.createElement(ProductContent, {
            productsList: productsList, 
            productHero: this.state.productHero, 
            onProductHeroChange: this.onProductHeroChange, 
            onAddToCartClick: this.onAddToCartClick})
        ), 
        React.createElement("footer", {className: "footer text-center"}, 
          React.createElement("img", {className: "profilePic", src: "https://pbs.twimg.com/profile_images/587619661157683200/dqW2BbMa_200x200.jpg", alt: "Twitter Pic"}), 
          React.createElement("p", null, React.createElement("small", null, "Built by ", React.createElement("a", {href: "http://twitter.com/johnamiahford", target: "_blank"}, this.props.author)))
        )
      )
    );
  }
});

module.exports = ProductParent;

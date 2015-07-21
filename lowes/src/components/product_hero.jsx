'use strict';

var React = require('react');

var ProductHero = React.createClass({

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
        arr.push(<li key={i} className="productHero--bullet">{item}</li>);
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
      <div className="prodcutHero">
        <div className="grid grid--full grid--fit">
          <div className="grid-cell">
            <div className="grid grid--1of3 grid--fit">
              <div className="grid-cell">
                <img className="mobile--image-fit" src={image} alt={productInfo.p_product_brand_name} />
              </div>
              <div className="grid-cell">
                <div className="prodcutHero--description">
                  <p><strong>{productInfo.p_product_brand_name}</strong> {productInfo.p_product_description}</p>
                  <ul className="show-bullets">
                    {this.renderSomeBullets(bullets)}
                  </ul>
                </div>
              </div>
              <div className="grid-cell grid--fit-mobile text-center">
                <button className="buy" onClick={this.addToCartClick} data-cart-message={cartMessage}>Add to Cart</button>
                <p className="productHero--price"><strong>{price}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProductHero;

'use strict';

var React = require('react');
var ProductParent = require('./components/product_parent');

var products = document.getElementById('lowesProductData').value;

React.render(
  <ProductParent
    title="Welcome to the Lowes Assessment!"
    author="@johnamiahford"
    products={JSON.parse(products)} />,
  document.getElementById('react')
);

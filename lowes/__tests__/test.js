// __tests__/test.js

jest.dontMock('../src/components/product_parent.jsx');

describe('test', function() {
  it('the widget actually renders', function() {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var ProductParent = require('../src/components/product_parent.jsx');
    var title = "Very Hapi";
    var author = "John";

    // Render a checkbox with label in the document
    var product = TestUtils.renderIntoDocument(
      <ProductParent title={title} author={author} />
    );

    // Verify that it's Off by default
    var titleField = TestUtils.findRenderedDOMComponentWithClass(product, 'title');
    expect(titleField.getDOMNode().textContent).toEqual(title);
  });
});

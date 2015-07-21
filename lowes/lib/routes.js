import Path from 'path';
import Fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

var FETCH_URL = "http://m.lowes.com/IntegrationServices/resources/productList/json/v3_0/4294857975?langId=-1&storeId=10702&catalogId=10051&nValue=4294857975&storeNumber=0595&pageSize=20&firstRecord=0&refinements=5003703";

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler(request, reply) {
      Fetch(FETCH_URL)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("Bad response");
          }
          return response.json();
        })
        .then((products) => {
          return reply.view('index', {
            products: JSON.stringify(products)
          });
        });
    }
  },
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: Path.join(process.cwd(), 'public')
      }
    }
  }
];

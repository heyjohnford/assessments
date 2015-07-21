import Path from 'path';
import Hapi from 'hapi';
import Good from 'good';
import Routes from '../lib/routes';
import HapiReact from 'hapi-react';

var PORT = process.env.PORT || 8000;
var server = new Hapi.Server();
var HapiReactOptions = {
  jsx: { harmony: true }
};
var engine = HapiReact(HapiReactOptions);

function handleRegisterErrors(err) {
  if (err) {
    throw err;
  }
}

server.connection({
  host: 'localhost',
  port: PORT
});

server.views({
  engines: {
    html: require('handlebars'),
    jsx: engine
  },
  defaultExtension: 'html',
  path: Path.join(process.cwd(), 'public', 'views')
});

// Serve the routes
server.route(Routes);

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, handleRegisterErrors);

// Start the server
server.start(function () {
  console.log('Lowes assessment running on:', PORT);
});

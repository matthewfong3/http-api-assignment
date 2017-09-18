const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
const responseHandler = require('./responses.js');

// built-in node module for parsing URLs
const url = require('url');
// built-in node module for parsing query strings
// query strings are the key=value&key2=value2 paris after the ? in a url
const query = require('querystring');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/style.css': cssHandler.getCSS,
  '/': htmlHandler.getIndex,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const contentType = request.headers.accept;

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, contentType, params);
  } else urlStruct.notFound(request, response, contentType);
};

http.createServer(onRequest).listen(port);

console.log(`listening on 127.0.0.1: ${port}`);

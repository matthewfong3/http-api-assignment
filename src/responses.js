const respond = (request, response, status, contentType, content) => {
  response.writeHead(status, { 'Content-Type': contentType });
  response.write(content);
  response.end();
};

const createXMLresponse = (message, id) => {
  let xmlResponse = '<response>';
  xmlResponse += `<message>${message}</message>`;
  xmlResponse += `<id>${id}</id>`;
  xmlResponse += '</response>';

  return xmlResponse;
};

const success = (request, response, contentType) => {
  if (contentType === 'text/xml') {
    const responseXML = createXMLresponse('This is a successful response', 'Success');
    return respond(request, response, 200, contentType, responseXML);
  }

  const responseJSON = {
    message: 'This is a successful response',
    id: 'Success',
  };

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 200, contentType, responseString);
};

const badRequest = (request, response, contentType, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'Success',
  };

  // handle bad request if missing required parameters 
  if (!params.valid || params.valid !== 'true') {
    if (contentType === 'text/xml') {
      const responseXML = createXMLresponse('Missing valid query parameter set to true', 'Bad Request');
      return respond(request, response, 400, contentType, responseXML);
    }

    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'Bad Request';

    const responseString = JSON.stringify(responseJSON);

    return respond(request, response, 400, contentType, responseString);
  }

  if (contentType === 'text/xml') {
    const responseXML = createXMLresponse('This request has the required parameters', 'Success');
    return respond(request, response, 200, contentType, responseXML);
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 200, contentType, responseString);
};

const unauthorized = (request, response, contentType, params) => {
  const responseJSON = {
    message: 'You have successfully viewed the content',
    id: 'Success',
  };

  // handle unauthorized if missing required parameters
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    if (contentType === 'text/xml') {
      const responseXML = createXMLresponse('Missing loggedIn query parameter set to yes', 'Unauthorized');
      return respond(request, response, 401, contentType, responseXML);
    }

    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'Unauthorized';

    const responseString = JSON.stringify(responseJSON);

    return respond(request, response, 401, contentType, responseString);
  }

  if (contentType === 'text/xml') {
    const responseXML = createXMLresponse('You have successfully viewed the content', 'Success');
    return respond(request, response, 200, contentType, responseXML);
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 200, contentType, responseString);
};

const forbidden = (request, response, contentType) => {
  if (contentType === 'text/xml') {
    const responseXML = createXMLresponse('You do not have access to this content', 'Forbidden');
    return respond(request, response, 403, contentType, responseXML);
  }

  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'Forbidden',
  };

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 403, contentType, responseString);
};

const internal = (request, response, contentType) => {
  if (contentType === 'text/xml') {
    const responseXML = createXMLresponse('Internal Server Error. Something went wrong', 'Internal Server Error');
    return respond(request, response, 500, contentType, responseXML);
  }

  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'Internal Server Error',
  };

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 500, contentType, responseString);
};

const notImplemented = (request, response, contentType) => {
  if (contentType === 'text/xml') {
    const responseXML = createXMLresponse('A get request for this page has not been implemented yet. Check again later for updated content', 'Not Implemented');
    return respond(request, response, 501, contentType, responseXML);
  }

  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'Not Implemented',
  };

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 501, contentType, responseString);
};

const notFound = (request, response, contentType) => {
  if (contentType === 'text/xml') {
    const responseXML = createXMLresponse('This page you are looking for was not found', 'Resource Not Found');
    return respond(request, response, 404, contentType, responseXML);
  }

  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'Resource Not Found',
  };

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 404, contentType, responseString);
};

module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internal = internal;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;

const fs = require('fs'); // pull in the file system module

const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports.getCSS = getCSS;

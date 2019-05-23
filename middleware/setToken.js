const jwt = require('jsonwebtoken');
const secrets = require('../secrets.js');

// very hacky
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwt, (err, decodedToken) => {
      if (err) {
        next();
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    next();
  }
};

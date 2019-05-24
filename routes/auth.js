const express = require('express'),
      bcrypt = require('bcrypt'),
      Users = require('../models/users.js'),
      jwt = require('jsonwebtoken'),
      secrets = require('../secrets.js'),
      restricted = require('../middleware/restricted.js');

const router = express.Router();

/**
   @api {post} auth/register Register user
   @apiName RegisterUser
   @apiGroup Auth
   
   @apiParam {String} username username
   @apiParam {String} password password
   
   @apiParamExample Example Body:
   { username: 'test',
     password: 'password' }
   
   @apiSuccess {Number} id user id
   @apiSuccess {String} username username
   @apiSuccess {Array} roles all user roles. Null if there are no roles.
   @apiSuccess {String} token json web token, valid for 24 hours

   @apiSuccessExample Success-reponse:
   HTTP/1.1 201 OK
   { id: 3,
     username: 'test',
     roles: null,
     token:
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbCwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNTU4NTQwODY2LCJleHAiOjE1NTg1NDQ0NjZ9.ZfXu0mKSPJYYbuw0ebkAJ6KzJIZnLWxxQKJo7euXj3s' }
*/
router.post('/register', (req, res) => {
  const user = req.body;
  // TODO better validation
  if (user && user.username && user.password) {
    user.password = bcrypt.hashSync(user.password, 10);
    Users.insert(user)
      .then(user => {
        const token = generateToken(user);
        user.password = undefined;
        user.token = token;
        res.status(201).json(user);
      })
      .catch(error => res.status(500).json({
        message: "Error registering user",
        error: error.toString()
      }));
  } else {
    res.status(400).json({
      message: "Requires username and password"
    });
  }
});

/**
   @api {post} auth/login Login user
   @apiName LoginUser
   @apiGroup Auth
   
   @apiParam {String} username username
   @apiParam {String} password password
   
   @apiParamExample Example Body:
   { username: 'test',
     password: 'password' }
   
   @apiSuccess {Number} id user id
   @apiSuccess {String} username username
   @apiSuccess {Array} roles all user roles. Null if there are no roles.
   @apiSuccess {String} token json web token, valid for 24 hours

   @apiSuccessExample Success-reponse:
   HTTP/1.1 201 OK
   { id: 1,
     username: 'henry',
     roles: ['admin'],
     token:
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbCwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNTU4NTQwODY2LCJleHAiOjE1NTg1NDQ0NjZ9.ZfXu0mKSPJYYbuw0ebkAJ6KzJIZnLWxxQKJo7euXj3s' }
*/

router.post('/login', (req, res) => {
  const creds = req.body;
  if (creds && creds.username && creds.password) {
    Users.getBy({username: creds.username})
      .then(([user]) => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          user.password = undefined;
          user.token = token;
          res.status(200).json(user);
        } else {
          res.status(401).json({
            message: "Invalid credentials"
          });
        }
      })
      .catch(error => res.status(500).json({
        message: "Error logging in",
        error: error.toString()
      }));
  } else {
    res.status(400).json({
      message: "Requires username and password"
    });
  }
});

/**
   @api {post} auth/refresh Refresh token
   @apiName RefreshUser
   @apiGroup Auth
   
   @apiHeader {String} Authorization json web token
   
   @apiSuccess {Number} id user id
   @apiSuccess {String} username username
   @apiSuccess {String} token json web token, valid for 24 hours

   @apiSuccessExample Success-reponse:
   HTTP/1.1 201 OK
   { id: 3,
     username: 'test',
     roles: null,
     token:
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbCwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNTU4NTQwODY2LCJleHAiOjE1NTg1NDQ0NjZ9.ZfXu0mKSPJYYbuw0ebkAJ6KzJIZnLWxxQKJo7euXj3s' }
*/


router.post('/refresh', restricted, (req, res) => {
  const {username} = req.token;
  Users.getBy({username})
    .then(([user]) => {
      const token = generateToken(user);
      user.token = token;
      res.status(200).json(user);
    })
    .catch(error => res.status(500).json({
      message: "Error refreshing token.",
      error: error.toString()
    }));
});

function generateToken(user) {
  user.password = undefined;
  const payload = user;
  const options = {
    expiresIn: '24h',
  };
  return jwt.sign(payload, secrets.jwt, options);
}

module.exports = router;


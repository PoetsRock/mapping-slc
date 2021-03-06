'use strict';

module.exports = function (app) {
  // User Routes
  const express = require('express');
  const router = express.Router();
  const users = require('../controllers/users.server.controller');
  const assets = require('../controllers/users/users.uploader.server.controller');

  // Setting up the users profile api
  app.route('/api/v1/users/me').get(users.me);

  // User Profile Image File to Client
  app.route('/api/v1/users/:userId/media/:imageId')
    .get(assets.getS3File);

  // User Profile Image
  app.route('/api/v1/users/:userId/images/:imageId')
    .get(assets.getS3File);

  app.route('/api/v1/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/v1/users/password').post(users.changePassword);
  
  //   '/api/v1/users/:userId/images' is located in media.server.routes.js
  // .post(users.uploadUserProfileImage);

  // Finish by binding the user middleware
  app.param('userId', users.userByID);

  //mount the router on the app
  app.use('/', router);


};

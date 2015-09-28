'use strict';

module.exports = function(app) {
    var users = require('../../../users/server/controllers/users.server.controller.js'),
        projectsPolicy = require('../policies/projects.server.policy'),
        projects = require('../../../projects/server/controllers/projects.server.controller'),
        mongoose = require('mongoose'),
        Project = mongoose.model('Project'),
        tractData = require('../models/data/utahTract.json'),
        markerData = require('../models/project.server.model.js'),
        request = require('request');


// Projects collection routes
  app.route('/api/projects').all(projectsPolicy.isAllowed)
    .get(projects.list)
    .post(projects.create);

// Single project routes
  app.route('/api/projects/:projectId').all(projectsPolicy.isAllowed)
    .get(projects.read)
    .put(projects.update)
    .delete(projects.delete);


// Project Markers Routes
    app.route('/api/markerData').all(projectsPolicy.isAllowed)
        .get(projects.markerList);

    // Finish by binding the Project middleware
    app.param('projectId', projects.projectByID);

///**
//** Admin Routes
//**/
//    app.route('/admins')
//        .get(admins.hasAuthorization, admins.list)
//        .post(users.requiresLogin, admins.hasAuthorization, admins.create);
//
//    app.route('/admins/:adminId')
//        .get(admins.hasAuthorization, admins.read)
//        .put(users.requiresLogin, admins.hasAuthorization, admins.update)
//        .delete(users.requiresLogin, admins.hasAuthorization, admins.delete);


    /**
     * routes for Natural Language Processing Engine
     */
    //app.route('/api/nlp')
    //    .get(projects.nlpEngine);


    // This is the search route, make a GET request on this endpoitn to return search results
    app.route('/api/search').all(projectsPolicy.isAllowed)
        .post(function(req,res){
            Project.search({query:req.body.q}, function(err, results){
                res.send(results);
            });
    });



    //Google Places API Call
    app.route('/api/places')
      .get(function (req, res) {
          var results = {};
          var tempResults = [];
          var query = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBZ63pS3QFjYlXuaNwPUTvcYdM-SGRmeJ0&location=40.773,-111.902&radius=1000';
          request(query, function (error, response, body) {
              body = JSON.parse(body);
              res.jsonp(body);
              var pageToken = body['next_page_token'];
              console.log('pageToken: ', pageToken);
              console.log('body2: ', body);
              results = body;

              var secondQuery = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=' + pageToken + '&key=AIzaSyBZ63pS3QFjYlXuaNwPUTvcYdM-SGRmeJ0';
              console.log('secondQuery: ', secondQuery);
              request(secondQuery, function (error, response, body) {
                  console.log('body2: ', body);
                  tempResults = results.push(body);
                  console.log('final results: ', results);
              });
          });
      });



// Utah Census Tract Routes
    app.route('/api/tractData')
      .get(function (req, res) {
          res.jsonp(tractData);
      });


};

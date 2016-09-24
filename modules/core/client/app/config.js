(function (window) {
  'use strict';

  var applicationModuleName = 'mapping-slc';

  var service = {
    applicationEnvironment: window.env,
    applicationModuleName: applicationModuleName,

    applicationModuleVendorDependencies: ['ngAnimate', 'ngCookies', 'ngMessages', 'ngMaterial', 'ngMdIcons','ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils', 'LocalStorageModule', 'bootstrapLightbox', 'cgNotify', 'vcRecaptcha', 'ngFileUpload', 'ngImgCrop'],
    registerModule: registerModule
  };

  window.ApplicationConfiguration = service;

  // Add a new vertical module
  function registerModule(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);

  }
}(window));

// 'use strict';
//
// /**
//  * Module dependencies.
//  */
// var _ = require('lodash'),
//   fs = require('fs'),
//   defaultAssets = require('./config/assets/default'),
//   testAssets = require('./config/assets/test'),
//   glob = require('glob'),
//   gulp = require('gulp'),
//   sourcemaps = require('gulp-sourcemaps'),
//   concat = require('gulp-concat'),
//   babel = require('gulp-babel'),
//   gulpLoadPlugins = require('gulp-load-plugins'),
//   runSequence = require('run-sequence'),
//   gutil = require('gulp-util'),
//   plugins = gulpLoadPlugins({
//     rename: {
//       'gulp-angular-templatecache': 'templateCache'
//     }
//   }),
//   pngquant = require('imagemin-pngquant'),
//   path = require('path'),
//   endOfLine = require('os').EOL,
//   argv = require('yargs').argv,
//   protractor = require('gulp-protractor').protractor,
//   webdriver_update = require('gulp-protractor').webdriver_update,
//   webdriver_standalone = require('gulp-protractor').webdriver_standalone,
//   KarmaServer = require('karma').Server;

// // import { stream } from 'wiredep';
// // import lcovMerger from 'lcov-result-merger';
// // import webpack from 'webpack-stream';
//
//
// //serve local production files
// gulp.task('serve-local-prod', function() {
//   serve();
// });
//
// // Set NODE_ENV to 'test'
// gulp.task('env:test', function () {
//   process.env.NODE_ENV = 'test';
// });
//
// // Set NODE_ENV to 'development'
// gulp.task('env:dev', function () {
//   //process.env.NODE_ENV = 'development';
//   process.env.NODE_ENV = 'local-development';
// });
//
// // Set NODE_ENV to 'production'
// gulp.task('env:prod', function () {
//   process.env.NODE_ENV = 'production';
// });
//
// // Nodemon task
// gulp.task('nodemon', function () {
//   return plugins.nodemon({
//     script: 'server.js',
//     nodeArgs: ['--debug'],
//     ext: 'js,html',
//     watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
//   });
// });
//
// gulp.task('node-inspector', function() {
//   gulp.src([])
//   .pipe(plugins.nodeInspector({
//     debugPort: 5858,
//     webHost: '0.0.0.0',
//     webPort: 1337,
//     saveLiveEdit: false,
//     preload: true,
//     inject: true,
//     hidden: [],
//     stackTraceLimit: 50,
//     sslKey: '',
//     sslCert: ''
//   }));
// });
//
// // Nodemon debug task
// gulp.task('nodemon-debug', function () {
//   return plugins.nodemon({
//     script: 'server.js',
//     nodeArgs: ['--debug'],
//     ext: 'js,html',
//     verbose: true,
//     watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
//   });
// });
//
//
// // Watch Files For Changes
// gulp.task('watch', function () {
//   // Start livereload
//   plugins.livereload.listen();
//
//   // Add watch rules
//   gulp.watch(defaultAssets.server.views).on('change', plugins.livereload.changed);
//   gulp.watch(defaultAssets.server.allJS).on('change', plugins.livereload.changed);
//   gulp.watch(defaultAssets.client.js).on('change', plugins.livereload.changed);
//   gulp.watch(defaultAssets.client.css).on('change', plugins.livereload.changed);
//   gulp.watch(defaultAssets.client.sass, ['sass', 'csslint']).on('change', plugins.livereload.changed);
//   gulp.watch(defaultAssets.client.less, ['less', 'csslint']).on('change', plugins.livereload.changed);
//
//   if (process.env.NODE_ENV === 'production') {
//     gulp.watch(defaultAssets.server.gulpConfig, ['templatecache', 'jshint']);
//     gulp.watch(defaultAssets.client.views, ['templatecache', 'jshint']).on('change', plugins.livereload.changed);
//   } else {
//     gulp.watch(defaultAssets.server.gulpConfig, ['jshint']);
//     gulp.watch(defaultAssets.client.views).on('change', plugins.livereload.changed);
//   }
//
//   if (process.env.NODE_ENV === 'test') {
//     // Add Server Test file rules
//     gulp.watch([testAssets.tests.server, defaultAssets.server.allJS], ['test:server']).on('change', function (file) {
//       var runOnlyChangedTestFile = argv.onlyChanged ? true : false;
//
//       // check if we should only run a changed test file
//       if (runOnlyChangedTestFile) {
//         var changedTestFiles = [];
//
//         // iterate through server test glob patterns
//         _.forEach(testAssets.tests.server, function (pattern) {
//           // determine if the changed (watched) file is a server test
//           _.forEach(glob.sync(pattern), function (f) {
//             var filePath = path.resolve(f);
//
//             if (filePath === path.resolve(file.path)) {
//               changedTestFiles.push(f);
//             }
//           });
//         });
//
//         // set task argument for tracking changed test files
//         argv.changedTestFiles = changedTestFiles;
//       }
//
//       plugins.livereload.changed();
//     });
//   }
// });
//
// // CSS linting task
// gulp.task('csslint', function (done) {
//   return gulp.src(defaultAssets.client.css)
//     .pipe(plugins.csslint('.csslintrc'))
//     .pipe(plugins.csslint.reporter())
//     .pipe(plugins.csslint.reporter(function (file) {
//       if (!file.csslint.errorCount) {
//         done();
//       }
//     }));
// });
//
// // JS linting task
// gulp.task('jshint', function () {
//   var assets = _.union(
//     defaultAssets.server.gulpConfig,
//     defaultAssets.server.allJS,
//     defaultAssets.client.js,
//     testAssets.tests.server,
//     testAssets.tests.client,
//     testAssets.tests.e2e
//   );
//
//   return gulp.src(assets)
//     .pipe(plugins.jshint())
//     .pipe(plugins.jshint.reporter('default'))
//     .pipe(plugins.jshint.reporter('fail'));
// });
//
// // ESLint JS linting task
// gulp.task('eslint', function () {
//   var assets = _.union(
//     defaultAssets.server.gulpConfig,
//     defaultAssets.server.allJS,
//     defaultAssets.client.js
//     //testAssets.tests.server,
//     //testAssets.tests.client,
//     //testAssets.tests.e2e
//   );
//
//   return gulp.src(assets)
//     .pipe(plugins.eslint())
//     .pipe(plugins.eslint.format());
// });
//
// // JS minifying task
// gulp.task('uglify', function () {
//   var assets = _.union(
//     defaultAssets.client.js,
//     defaultAssets.client.templates
//   );
//
//   return gulp.src(assets)
//     .pipe(plugins.ngAnnotate())
//     .pipe(plugins.uglify({
//       mangle: false
//     }))
//     .on('error', gutil.log)
//     .pipe(plugins.concat('application.min.js'))
//     .pipe(gulp.dest('public/dist'));
// });
//
// // CSS minifying task
// gulp.task('cssmin', function () {
//   return gulp.src(defaultAssets.client.css)
//     .pipe(plugins.cssmin())
//     .pipe(plugins.concat('application.min.css'))
//     .pipe(gulp.dest('public/dist'));
// });
//
// // Sass task
// gulp.task('sass', function () {
//   return gulp.src(defaultAssets.client.sass)
//     .pipe(plugins.sass())
//     .pipe(plugins.autoprefixer())
//     .pipe(plugins.rename(function (file) {
//       file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
//     }))
//     .pipe(gulp.dest('./modules/'));
// });
//
// // Less task
// gulp.task('less', function () {
//   return gulp.src(defaultAssets.client.less)
//     .pipe(plugins.less())
//     .pipe(plugins.autoprefixer())
//     .pipe(plugins.rename(function (file) {
//       file.dirname = file.dirname.replace(path.sep + 'less', path.sep + 'css');
//     }))
//     .pipe(gulp.dest('./modules/'));
// });
//
// // Imagemin task
// gulp.task('imagemin', function () {
//   return gulp.src(defaultAssets.client.img)
//     .pipe(plugins.imagemin({
//       progressive: true,
//       svgoPlugins: [{ removeViewBox: false }],
//       use: [pngquant()]
//     }))
//     .pipe(gulp.dest('public/dist/img'));
// });
//
// gulp.task('babel', function () {
//   return gulp.src('src/app.js')
//   .pipe(babel())
//   .pipe(gulp.dest('build'));
// });
//
// gulp.task('babel-sourcemaps', function () {
//   return gulp.src('src/**/*.js')
//   .pipe(sourcemaps.init())
//   .pipe(babel())
//   .pipe(concat('all.js'))
//   .pipe(sourcemaps.write('.'))
//   .pipe(gulp.dest('build'));
// });
//
// // wiredep task to default
// gulp.task('wiredep', function () {
//   return gulp.src('config/assets/default.js')
//   .pipe(plugins.wiredep({
//     ignorePath: '../../'
//   }))
//   .pipe(gulp.dest('config/assets/'));
// });
//
// // wiredep task to production
// gulp.task('wiredep:prod', function () {
//   return gulp.src('config/assets/production.js')
//   .pipe(plugins.wiredep({
//     ignorePath: '../../',
//     fileTypes: {
//       js: {
//         replace: {
//           css: function (filePath) {
//             var minFilePath = filePath.replace('.css', '.min.css');
//             var fullPath = path.join(process.cwd(), minFilePath);
//             if (!fs.existsSync(fullPath)) {
//               return '\'' + filePath + '\',';
//             } else {
//               return '\'' + minFilePath + '\',';
//             }
//           },
//           js: function (filePath) {
//             var minFilePath = filePath.replace('.js', '.min.js');
//             var fullPath = path.join(process.cwd(), minFilePath);
//             if (!fs.existsSync(fullPath)) {
//               return '\'' + filePath + '\',';
//             } else {
//               return '\'' + minFilePath + '\',';
//             }
//           }
//         }
//       }
//     }
//   }))
//   .pipe(gulp.dest('config/assets/'));
// });
//
// // Copy local development environment config example
// gulp.task('copyLocalEnvConfig', function () {
//   var src = [];
//   var renameTo = 'local-development.js';
//
//   // only add the copy source if our destination file doesn't already exist
//   if (!fs.existsSync('config/env/' + renameTo)) {
//     src.push('config/env/local.example.js');
//   }
//
//   return gulp.src(src)
//     .pipe(plugins.rename(renameTo))
//     .pipe(gulp.dest('config/env'));
// });
//
//
// // Angular template cache task
// gulp.task('templatecache', function () {
//   var re = new RegExp('\\' + path.sep + 'client\\' + path.sep, 'g');
//
//   return gulp.src(defaultAssets.client.views)
//     .pipe(plugins.templateCache('templates.js', {
//       root: 'modules/',
//       module: 'core',
//       templateHeader: '(function () {' + endOfLine + '	\'use strict\';' + endOfLine + endOfLine + '	angular' + endOfLine + '		.module(\'<%= module %>\'<%= standalone %>)' + endOfLine + '		.run(templates);' + endOfLine + endOfLine + '	templates.$inject = [\'$templateCache\'];' + endOfLine + endOfLine + '	function templates($templateCache) {' + endOfLine,
//       templateBody: '		$templateCache.put(\'<%= url %>\', \'<%= contents %>\');',
//       templateFooter: '	}' + endOfLine + '})();' + endOfLine,
//       transformUrl: function (url) {
//         return url.replace(re, path.sep);
//       }
//     }))
//     .pipe(gulp.dest('build'));
// });
//
// gulp.task('webpack', () => {
//   return gulp.src(build)
//     .pipe(webpack(require('./webpack.config')))
//     .pipe(gulp.dest(output));
// });
//
// // Mocha tests task
// gulp.task('mocha', function (done) {
//   // Open mongoose connections
//   var mongoose = require('./config/lib/mongoose.js');
//   var testSuites = Array.isArray(argv.changedTestFiles) && argv.changedTestFiles.length ? argv.changedTestFiles : testAssets.tests.server;
//   var error;
//
//   // Connect mongoose
//   mongoose.connect(function () {
//     mongoose.loadModels();
//     // Run the tests
//     gulp.src(testAssets.tests.server)
//       .pipe(plugins.mocha({
//         reporter: 'spec',
//         timeout: 10000
//       }))
//       .on('error', function (err) {
//         // If an error occurs, save it
//         error = err;
//       })
//       .on('end', function () {
//         // When the tests are done, disconnect mongoose and pass the error state back to gulp
//         mongoose.disconnect(function () {
//           done(error);
//         });
//       });
//   });
//
// });
//
// // Karma test runner task
// gulp.task('karma', function (done) {
//   new KarmaServer({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done).start();
// });
//
// // Drops the MongoDB database, used in e2e testing
// gulp.task('dropdb', function (done) {
//   // Use mongoose configuration
//   var mongoose = require('./config/lib/mongoose.js');
//
//   mongoose.connect(function (db) {
//     db.connection.db.dropDatabase(function (err) {
//       if(err) {
//         console.log(err);
//       } else {
//         console.log('Successfully dropped db: ', db.connection.db.databaseName);
//       }
//       db.connection.db.close(done);
//     });
//   });
// });
//
// // Downloads the selenium webdriver
// gulp.task('webdriver_update', webdriver_update);
//
// // Start the standalone selenium server
// // NOTE: This is not needed if you reference the
// // seleniumServerJar in your protractor.conf.js
// gulp.task('webdriver_standalone', webdriver_standalone);
//
// // Protractor test runner task
// gulp.task('protractor', ['webdriver_update'], function () {
//   gulp.src([])
//     .pipe(protractor({
//       configFile: 'protractor.conf.js'
//     }))
//     .on('end', function() {
//       console.log('E2E Testing complete');
//       // exit with success.
//       process.exit(0);
//     })
//     .on('error', function(err) {
//       console.log('E2E Tests failed');
//       process.exit(1);
//     });
// });
//
//
// // Run the project in development mode
// gulp.task('default', function (done) {
//   runSequence('env:dev', ['copyLocalEnvConfig'], 'babel', 'babel-sourcemaps', ['nodemon', 'watch'], done);
// });
//
// // Lint CSS and JavaScript files.
// gulp.task('lint', function (done) {
//   runSequence('less', 'sass', ['csslint', 'eslint', 'jshint'], done);
// });
//
// // Lint project files and minify them into two production files.
// gulp.task('build', function (done) {
//   runSequence('env:dev', ['uglify', 'cssmin'], done);
// });
//
// // Run the project tests
// gulp.task('test', function (done) {
//   runSequence('env:test', 'test:server', 'karma', 'nodemon', 'protractor', done);
// });
//
// gulp.task('test:server', function (done) {
//   runSequence('env:test', ['copyLocalEnvConfig'], 'lint', 'mocha', done);
// });
//
// // Watch all server files for changes & run server tests (test:server) task on changes
// // optional arguments:
// //    --onlyChanged - optional argument for specifying that only the tests in a changed Server Test file will be run
// // example usage: gulp test:server:watch --onlyChanged
// gulp.task('test:server:watch', function (done) {
//   runSequence('test:server', 'watch', done);
// });
//
// gulp.task('test:client', function (done) {
//   runSequence('env:test', 'karma', done);
// });
//
// gulp.task('test:e2e', function (done) {
//   runSequence('env:test', 'dropdb', 'nodemon', 'protractor', done);
// });
//
// // Lint project files and minify them into two production files.
// gulp.task('build-with-lint', function (done) {
//   runSequence('env:dev', 'lint', ['uglify', 'cssmin'], done);
// });
//
// // Minify project files into two production files.
// gulp.task('build', function (done) {
//   runSequence('env:dev', 'wiredep:prod', ['uglify', 'cssmin'], done);
// });
//
// // Watch all server files for changes & run server tests (test:server) task on changes
// // optional arguments:
// // Run the project in debug mode
// gulp.task('debug', function (done) {
//   runSequence('env:dev', ['nodemon-debug', 'watch'], done);
// });
//
// // Run the project in production mode
// gulp.task('prod', function (done) {
//   runSequence(['copyLocalEnvConfig', 'templatecache'], 'build', 'env:prod', ['nodemon', 'watch'], done);
// });
//
//
// /**
//  *  Heroku Buildpack for Node.js and gulp.js
//  *
//  * url: https://github.com/timdp/heroku-buildpack-nodejs-gulp
//  - Set your Heroku app's buildpack URL to https://github.com/timdp/heroku-buildpack-nodejs-gulp.git
//  Add a Gulp task called `heroku:production` that builds your app
//  Serve your app using Express or whatever
//  **/
//
//
//
// /**
//
//
//  HEROKU SSH
//
//  source: https://devcenter.heroku.com/articles/git#ssh-git-transport
//
//  TO SETUP SSH BY DEFAULT:
//  git config --global url.ssh://git@heroku.com/.insteadOf https://git.heroku.com/
//
//  TO REVERSE:
//  git config --global --remove-section url.ssh://git@heroku.com/
//
//  **/




'use strict';

/**
 * Module dependencies.
 */




//   return gulp.src(assets)
//     .pipe(plugins.ngAnnotate())
//     .pipe(plugins.uglify({
//       mangle: false
//     }))
//     .on('error', gutil.log)
//     .pipe(plugins.concat('application.min.js'))
//     .pipe(gulp.dest('public/dist'));
// });



var _ = require('lodash'),
    fs = require('fs'),
    defaultAssets = require('./config/assets/default'),
    testAssets = require('./config/assets/test'),
    testConfig = require('./config/env/test'),
    glob = require('glob'),
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    runSequence = require('run-sequence'),
    plugins = gulpLoadPlugins({
      rename: {
        'gulp-angular-templatecache': 'templateCache'
      }
    }),
    gutil = require('gulp-util'),
    pngquant = require('imagemin-pngquant'),
    wiredep = require('wiredep').stream,
    path = require('path'),
    endOfLine = require('os').EOL,
    protractor = require('gulp-protractor').protractor,
    webdriver_update = require('gulp-protractor').webdriver_update,
    webdriver_standalone = require('gulp-protractor').webdriver_standalone,
    KarmaServer = require('karma').Server;

// Local settings
var changedTestFiles = [];

// Set NODE_ENV to 'test'
gulp.task('env:test', function () {
  process.env.NODE_ENV = 'test';
});

// Set NODE_ENV to 'development'
gulp.task('env:dev', function () {
  process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function () {
  process.env.NODE_ENV = 'production';
});

// Nodemon task
gulp.task('nodemon', function () {
  return plugins.nodemon({
    script: 'server.js',
    nodeArgs: ['--debug'],
    ext: 'js,html',
    watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
  });
});

gulp.task('node-inspector', function() {
  gulp.src([])
  .pipe(plugins.nodeInspector({
    debugPort: 5858,
    webHost: '0.0.0.0',
    webPort: 1337,
    saveLiveEdit: false,
    preload: true,
    inject: true,
    hidden: [],
    stackTraceLimit: 50,
    sslKey: '',
    sslCert: ''
  }));
});

// Nodemon debug task
gulp.task('nodemon-debug', function () {
  return plugins.nodemon({
    script: 'server.js',
    nodeArgs: ['--debug'],
    ext: 'js,html',
    verbose: true,
    watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
  });
});

// Watch Files For Changes
gulp.task('watch', function () {
  // Start livereload
  plugins.livereload.listen();

  // Add watch rules
  gulp.watch(defaultAssets.server.views).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.server.allJS, ['eslint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.js, ['eslint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.css, ['csslint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.sass, ['sass', 'csslint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.less, ['less', 'csslint']).on('change', plugins.livereload.changed);

  if (process.env.NODE_ENV === 'production') {
    gulp.watch(defaultAssets.server.gulpConfig, ['templatecache', 'eslint']);
    gulp.watch(defaultAssets.client.views, ['templatecache']).on('change', plugins.livereload.changed);
  } else {
    gulp.watch(defaultAssets.server.gulpConfig, ['eslint']);
    gulp.watch(defaultAssets.client.views).on('change', plugins.livereload.changed);
  }
});

// Watch server test files
gulp.task('watch:server:run-tests', function () {
  // Start livereload
  plugins.livereload.listen();

  // Add Server Test file rules
  gulp.watch([testAssets.tests.server, defaultAssets.server.allJS], ['test:server']).on('change', function (file) {
    changedTestFiles = [];

    // iterate through server test glob patterns
    _.forEach(testAssets.tests.server, function (pattern) {
      // determine if the changed (watched) file is a server test
      _.forEach(glob.sync(pattern), function (f) {
        var filePath = path.resolve(f);

        if (filePath === path.resolve(file.path)) {
          changedTestFiles.push(f);
        }
      });
    });

    plugins.livereload.changed();
  });
});

// CSS linting task
gulp.task('csslint', function () {
  return gulp.src(defaultAssets.client.css)
  .pipe(plugins.csslint('.csslintrc'))
  .pipe(plugins.csslint.formatter());
  // Don't fail CSS issues yet
  // .pipe(plugins.csslint.failFormatter());
});

// ESLint JS linting task
gulp.task('eslint', function () {
  var assets = _.union(
      defaultAssets.server.gulpConfig,
      defaultAssets.server.allJS,
      defaultAssets.client.js,
      testAssets.tests.server,
      testAssets.tests.client,
      testAssets.tests.e2e
  );

  return gulp.src(assets)
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format());
});

// JS minifying task
gulp.task('uglify', function () {
  var assets = _.union(
      defaultAssets.client.js,
      defaultAssets.client.templates
  );

  return gulp.src(assets)
  .pipe(plugins.ngAnnotate())
  .pipe(plugins.uglify({
    mangle: false
  }))
  .on('error', gutil.log)
  .pipe(plugins.concat('application.min.js'))
  .pipe(gulp.dest('public/dist'));
});

// CSS minifying task
gulp.task('cssmin', function () {
  return gulp.src(defaultAssets.client.css)
  .pipe(plugins.csso())
  .pipe(plugins.concat('application.min.css'))
  .pipe(gulp.dest('public/dist'));
});

// Sass task
gulp.task('sass', function () {
  return gulp.src(defaultAssets.client.sass)
  .pipe(plugins.sass())
  .pipe(plugins.autoprefixer())
  .pipe(plugins.rename(function (file) {
    file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
  }))
  .pipe(gulp.dest('./modules/'));
});

// Less task
gulp.task('less', function () {
  return gulp.src(defaultAssets.client.less)
  .pipe(plugins.less())
  .pipe(plugins.autoprefixer())
  .pipe(plugins.rename(function (file) {
    file.dirname = file.dirname.replace(path.sep + 'less', path.sep + 'css');
  }))
  .pipe(gulp.dest('./modules/'));
});

// Imagemin task
gulp.task('imagemin', function () {
  return gulp.src(defaultAssets.client.img)
  .pipe(plugins.imagemin({
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('public/dist/img'));
});

// wiredep task to default
gulp.task('wiredep', function () {
  return gulp.src('config/assets/default.js')
  .pipe(wiredep({
    ignorePath: '../../'
  }))
  .pipe(gulp.dest('config/assets/'));
});

// wiredep task to production
gulp.task('wiredep:prod', function () {
  return gulp.src('config/assets/production.js')
  .pipe(wiredep({
    ignorePath: '../../',
    fileTypes: {
      js: {
        replace: {
          css: function (filePath) {
            var minFilePath = filePath.replace('.css', '.min.css');
            var fullPath = path.join(process.cwd(), minFilePath);
            if (!fs.existsSync(fullPath)) {
              return '\'' + filePath + '\',';
            } else {
              return '\'' + minFilePath + '\',';
            }
          },
          js: function (filePath) {
            var minFilePath = filePath.replace('.js', '.min.js');
            var fullPath = path.join(process.cwd(), minFilePath);
            if (!fs.existsSync(fullPath)) {
              return '\'' + filePath + '\',';
            } else {
              return '\'' + minFilePath + '\',';
            }
          }
        }
      }
    }
  }))
  .pipe(gulp.dest('config/assets/'));
});

// Copy local development environment config example
gulp.task('copyLocalEnvConfig', function () {
  var src = [];
  var renameTo = 'local-development.js';

  // only add the copy source if our destination file doesn't already exist
  if (!fs.existsSync('config/env/' + renameTo)) {
    src.push('config/env/local.example.js');
  }

  return gulp.src(src)
  .pipe(plugins.rename(renameTo))
  .pipe(gulp.dest('config/env'));
});

// Make sure upload directory exists
gulp.task('makeUploadsDir', function () {
  return fs.mkdir('modules/users/client/img/profile/uploads', function (err) {
    if (err && err.code !== 'EEXIST') {
      console.error(err);
    }
  });
});

// Angular template cache task
gulp.task('templatecache', function () {
  return gulp.src(defaultAssets.client.views)
  .pipe(plugins.templateCache('templates.js', {
    root: 'modules/',
    module: 'core',
    templateHeader: '(function () {' + endOfLine + '	\'use strict\';' + endOfLine + endOfLine + '	angular' + endOfLine + '		.module(\'<%= module %>\'<%= standalone %>)' + endOfLine + '		.run(templates);' + endOfLine + endOfLine + '	templates.$inject = [\'$templateCache\'];' + endOfLine + endOfLine + '	function templates($templateCache) {' + endOfLine,
    templateBody: '		$templateCache.put(\'<%= url %>\', \'<%= contents %>\');',
    templateFooter: '	}' + endOfLine + '})();' + endOfLine
  }))
  .pipe(gulp.dest('build'));
});

// Mocha tests task
gulp.task('mocha', function (done) {
  // Open mongoose connections
  var mongoose = require('./config/lib/mongoose.js');
  var testSuites = changedTestFiles.length ? changedTestFiles : testAssets.tests.server;
  var error;

  // Connect mongoose
  mongoose.connect(function () {
    mongoose.loadModels();
    // Run the tests
    gulp.src(testSuites)
    .pipe(plugins.mocha({
      reporter: 'spec',
      timeout: 10000
    }))
    .on('error', function (err) {
      // If an error occurs, save it
      error = err;
    })
    .on('end', function () {
      // When the tests are done, disconnect mongoose and pass the error state back to gulp
      mongoose.disconnect(function () {
        done(error);
      });
    });
  });
});

// Prepare istanbul coverage test
gulp.task('pre-test', function () {

  // Display coverage for all server JavaScript files
  return gulp.src(defaultAssets.server.allJS)
  // Covering files
  .pipe(plugins.istanbul())
  // Force `require` to return covered files
  .pipe(plugins.istanbul.hookRequire());
});

// Run istanbul test and write report
gulp.task('mocha:coverage', ['pre-test', 'mocha'], function () {
  var testSuites = changedTestFiles.length ? changedTestFiles : testAssets.tests.server;

  return gulp.src(testSuites)
  .pipe(plugins.istanbul.writeReports({
    reportOpts: { dir: './coverage/server' }
  }));
});

// Karma test runner task
gulp.task('karma', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

// Run karma with coverage options set and write report
gulp.task('karma:coverage', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    preprocessors: {
      'modules/*/client/views/**/*.html': ['ng-html2js'],
      'modules/core/client/app/config.js': ['coverage'],
      'modules/core/client/app/init.js': ['coverage'],
      'modules/*/client/*.js': ['coverage'],
      'modules/*/client/config/*.js': ['coverage'],
      'modules/*/client/controllers/*.js': ['coverage'],
      'modules/*/client/directives/*.js': ['coverage'],
      'modules/*/client/services/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/client',
      reporters: [
        { type: 'lcov', subdir: '.' }
        // printing summary to console currently weirdly causes gulp to hang so disabled for now
        // https://github.com/karma-runner/karma-coverage/issues/209
        // { type: 'text-summary' }
      ]
    }
  }, done).start();
});

// Drops the MongoDB database, used in e2e testing
gulp.task('dropdb', function (done) {
  // Use mongoose configuration
  var mongoose = require('./config/lib/mongoose.js');

  mongoose.connect(function (db) {
    db.connection.db.dropDatabase(function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Successfully dropped db: ', db.connection.db.databaseName);
      }
      db.connection.db.close(done);
    });
  });
});

// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);

// Start the standalone selenium server
// NOTE: This is not needed if you reference the
// seleniumServerJar in your protractor.conf.js
gulp.task('webdriver_standalone', webdriver_standalone);

// Protractor test runner task
gulp.task('protractor', ['webdriver_update'], function () {
  gulp.src([])
  .pipe(protractor({
    configFile: 'protractor.conf.js'
  }))
  .on('end', function() {
    console.log('E2E Testing complete');
    // exit with success.
    process.exit(0);
  })
  .on('error', function(err) {
    console.error('E2E Tests failed:');
    console.error(err);
    process.exit(1);
  });
});

// Lint CSS and JavaScript files.
gulp.task('lint', function (done) {
  runSequence('less', 'sass', ['csslint', 'eslint'], done);
});

// Lint project files and minify them into two production files.
gulp.task('build', function (done) {
  runSequence('env:dev', 'wiredep:prod', ['uglify', 'cssmin'], done);
});

// Run the project tests
gulp.task('test', function (done) {
  runSequence('env:test', 'test:server', 'karma', 'nodemon', 'protractor', done);
});

gulp.task('test:server', function (done) {
  runSequence('env:test', ['copyLocalEnvConfig', 'makeUploadsDir', 'dropdb'], 'lint', 'mocha', done);
});

// Watch all server files for changes & run server tests (test:server) task on changes
gulp.task('test:server:watch', function (done) {
  runSequence('test:server', 'watch:server:run-tests', done);
});

gulp.task('test:client', function (done) {
  runSequence('env:test', 'lint', 'dropdb', 'karma', done);
});

gulp.task('test:e2e', function (done) {
  runSequence('env:test', 'lint', 'dropdb', 'nodemon', 'protractor', done);
});

gulp.task('test:coverage', function (done) {
  runSequence('env:test', ['copyLocalEnvConfig', 'makeUploadsDir', 'dropdb'], 'lint', 'mocha:coverage', 'karma:coverage', done);
});

// Run the project in development mode
gulp.task('default', function (done) {
  runSequence('env:dev', ['copyLocalEnvConfig'], ['nodemon', 'watch'], done);
});

// Run the project in debug mode
gulp.task('debug', function (done) {
  runSequence('env:dev', ['copyLocalEnvConfig', 'makeUploadsDir'], 'lint', ['node-inspector', 'nodemon-debug', 'watch'], done);
});

// Run the project in production mode
gulp.task('prod', function (done) {
  runSequence(['copyLocalEnvConfig', 'templatecache'], 'build', 'env:prod', ['nodemon', 'watch'], done);
});

'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        // 'public/lib/angular-bootstrap/ui-bootstrap-csp.css',
        '//api.tiles.mapbox.com/mapbox-gl-js/v0.23.0/mapbox-gl.css',
        'public/lib/angular-material/angular-material.css',
        'public/lib/angular-material/angular-material.layouts.min.css',
        'public/lib/angular-material-icons/angular-material-icons.css',
        'public/lib/font-awesome/css/font-awesome.css',
        'public/lib/angular-notify/dist/angular-notify.css',
        'public/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.css',
        'public/lib/flexslider/flexslider.css',
        'public/lib/ng-password-strength/dist/styles/main.css',
        'public/lib/ng-img-crop/compile/unminified/ng-img-crop.css',
        'public/lib/froala-wysiwyg-editor/css/froala_editor.min.css',
        'public/lib/froala-wysiwyg-editor/css/froala_style.min.css',

        //load css for plugins for Froala text editor
        'public/lib/froala-wysiwyg-editor/css/plugins/code_view.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/colors.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/draggable.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/emoticons.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/fullscreen.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/image_manager.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/image.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/line_breaker.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/table.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/video.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/char_counter.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/file.min.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/quick_insert.min.css'


      ],
      js: [
        'public/lib/jquery/dist/jquery.js',
        'public/lib/jquery-migrate/jquery-migrate.min.js',
        'public/lib/lodash/lodash.js',
        'public/lib/modernizr/modernizr.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-cookies/angular-cookies.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-route/angular-route.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-aria/angular-aria.js',
        'public/lib/angular-recaptcha/release/angular-recaptcha.min.js',
        'public/lib/angular-sanitize/angular-sanitize.js',
        'public/lib/bootstrap/dist/js/bootstrap.js',
        'public/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
        'public/lib/angular-material/angular-material.min.js',
        'public/lib/angular-material-icons/angular-material-icons.min.js',
        'public/lib/svg-morpheus/compile/minified/svg-morpheus.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/bluebird/js/browser/bluebird.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/ng-password-strength/dist/scripts/ng-password-strength.min.js',
        'public/lib/angular-local-storage/dist/angular-local-storage.min.js',
        'public/lib/ng-file-upload/ng-file-upload-shim.js',
        'public/lib/ng-file-upload/ng-file-upload.js',
        'public/lib/froala-wysiwyg-editor/js/froala_editor.min.js',
        'public/lib/ng-img-crop/compile/unminified/ng-img-crop.js',
        'public/lib/moment/min/moment.js',
        'public/lib/xmlToJSON.js/lib/xmlToJSON.js',
        'public/lib/flexslider/jquery.flexslider-min.js',
        'public/lib/angular-notify/dist/angular-notify.js',
        '//api.tiles.mapbox.com/mapbox-gl-js/v0.23.0/mapbox-gl.js',
        'public/lib/rangy/rangy-core.js',
        'public/lib/classie/classie.js',

        //load plugins for Froala text editor
        'public/lib/froala-wysiwyg-editor/js/plugins/align.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/char_counter.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/code_beautifier.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/code_view.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/colors.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/emoticons.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/entities.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/font_family.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/font_size.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/fullscreen.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/image.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/image_manager.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/inline_style.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/line_breaker.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/link.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/lists.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/paragraph_format.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/paragraph_style.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/quote.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/save.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/table.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/video.min.js',

        'public/lib/froala-wysiwyg-editor/js/plugins/draggable.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/file.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/forms.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/quick_insert.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/url.min.js'

      ],
      tests: [
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-material/angular-material-mocks.js'
      ]
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less',
      'modules/*/client/css/*.less'
    ],
    sass: [
      //'modules/*/client/scss/*.scss',
      'modules/*/client/css/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js',
      'modules/*/client/**/**/*.js'
    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg'
    ],
    views: [
      'modules/*/client/views/**/*.html',
      'modules/*/client/directives/views/**/*.html',
      'modules/*/client/directives/**/views/*.html',
    ],
    templates: ['build/templates.js']
  },
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: ['modules/*/server/config/*.js'],
    policies: 'modules/*/server/policies/*.js',
    views: ['modules/*/server/views/*.html']
  }
};

'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  validator = require('validator'),
  generatePassword = require('generate-password'),
  owasp = require('owasp-password-strength-test');


/**
 * `UserModifiedSchema` is a subCollection that consists of an array of objects. each object has two fields:
 * @prop modifiedBy {string}: userId of user who edited document
 * @prop modifiedAt {date}: timestamp that records when document was modified
 */
let UserModifiedSchema = new Schema({
  modifiedBy: String,
  modifiedAt: Date
});

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
  return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email, { require_tld: false }));
};

/**
 * User Schema
 **/
var UserSchema = new Schema({
  createdOn: {
    type: Date,
    default: Date.now
  },
  // ModifiedBy: {
  //   type: String
  // },
  // ModifiedOn: {
  //   type: Date
  // },
  namePrefix: {
    type: String,
    trim: true,
    default: ''
  },
  firstName: {
    type: String,
    trim: true,
    default: ''
    //validate: [validateLocalStrategyProperty, 'Please fill in your first name']
  },
  lastName: {
    type: String,
    default: '',
    //validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    trim: true,
  },
  displayName: {
    type: String,
    trim: true
  },
  userTitle: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    unique: true,
    //required: 'This email already exists',
    validate: [validateLocalStrategyEmail, 'Please use a valid email address'],
    trim: true
  },
  userStreet: {
    type: String,
    default: '',
    trim: true
  },
  userCity: {
    type: String,
    default: '',
    trim: true
  },
  userState: {
    type: String,
    default: '',
    trim: true
  },
  userZip: {
    type: Number,
    default: '',
    trim: true
  },
  username: {
    type: String,
    //unique: 'Username already exists',
    //required: 'Please fill in a username',
    //lowercase: true,
    trim: true
  },
  password: {
    type: String,
    default: ''
  },
  salt: {
    type: String
  },
  profileImageUrl: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  profileImageThumbUrl: {
    type: String,
    trim: true,
    default: 'modules/users/client/img/profile/thumb_default.png'
  },
  profileImageFileName: {
    type: String,
    default: 'default.png'
  },
  profileImageETag: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'blocked', 'unregistered', 'registered', 'contributor', 'admin', 'superUser']
    }],
    default: ['registered'],
    required: 'Please provide at least one role'
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastVisit: {
    type: Date,
    default: Date.now
  },
  //this field will store info about users browsing history and preferences
  browseHistory: {
    type: Object,
    default: {}
  },
  userProfileViewCount: {
    type: Number,
    default: 0
  },
  bookmarks: {
    type: [{
      type: Object
    }]
  },
  favorites: {
    type: [{
      type: String
    }],
    default: []
  },
  newsletter: {
    type: Boolean,
    default: false
  },
  associatedProjects: {
    type: [{
      type: String
    }],
    default: []
  },
  bio: {
    type: String,
    default: '',
    trim: true
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  
  modified: [UserModifiedSchema]
  
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Hook a pre validate method to test the local password
 */
UserSchema.pre('validate', function (next) {
  // Pass a hash of settings to the `config` method to override defaults
  owasp.config({
    minLength: 8  //this overrides default val -- original set to 10
  });
  if (this.provider === 'local' && this.password && this.isModified('password')) {
    var result = owasp.test(this.password);
    if (result.errors.length) {
      var error = result.errors.join(' ');
      this.invalidate('password', error);
    }
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
  var _this = this;
  var possibleUsername = username.toLowerCase() + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function (err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

/**
 * Generates a random passphrase that passes the owasp test
 * Returns a promise that resolves with the generated passphrase, or rejects with an error if something goes wrong.
 * NOTE: Passphrases are only tested against the required owasp strength tests, and not the optional tests.
 */
UserSchema.statics.generateRandomPassphrase = function () {
  return new Promise(function (resolve, reject) {
    var password = '';
    var repeatingCharacters = new RegExp('(.)\\1{2,}', 'g');

    // iterate until the we have a valid passphrase
    // NOTE: Should rarely iterate more than once, but we need this to ensure no repeating characters are present
    while (password.length < 20 || repeatingCharacters.test(password)) {
      // build the random password
      password = generatePassword.generate({
        length: Math.floor(Math.random() * (20)) + 20, // randomize length between 20 and 40 characters
        numbers: true,
        symbols: false,
        uppercase: true,
        excludeSimilarCharacters: true,
      });

      // check if we need to remove any repeating characters
      password = password.replace(repeatingCharacters, '');
    }

    // Send the rejection back if the passphrase fails to pass the strength test
    if (owasp.test(password).errors.length) {
      reject(new Error('An unexpected problem occured while generating the random passphrase'));
    } else {
      // resolve with the validated passphrase
      resolve(password);
    }
  });
};

mongoose.model('User', UserSchema);
mongoose.model('UserModified', UserModifiedSchema);

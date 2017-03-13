'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Property = mongoose.model('Property');

/**
 * Globals
 */
var user,
  property;

/**
 * Unit tests
 */
describe('Property Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      property = new Property({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return property.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Property.remove().exec();
    User.remove().exec();

    done();
  });
});
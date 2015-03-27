var crypto = require('../../lib/crypto');
var sinon = require('sinon');

describe('lib/crypto', function() {

  describe('hash', function() {

    it('should hash the given data with the md5 algorithm', function() {
      var password = 'this is a test password';
      var expected = '8REqjMw1qKqHxXwjfNEsmw==';

      var actual = crypto.hash(password);
      expect(actual).toBe(expected);
    });

  });

  describe('encrypt', function() {
    it('should encrypt the given data', function() {
      var password = 'this is a test password';
      var data = 'this is a test message';
      var expected = '9LhhaCalAOKmjNsg9LZpQYns5BGCKoOkRrv+Ob+B+Vs=';

      var actual = crypto.encrypt(data, password);
      expect(actual).toBe(expected);
    });
  });

  describe('decrypt', function() {
    it('should decrypt the given data', function() {
      var password = 'this is a test password';
      var data = '9LhhaCalAOKmjNsg9LZpQYns5BGCKoOkRrv+Ob+B+Vs=';
      var expected = 'this is a test message';

      var actual = crypto.decrypt(data, password);
      expect(actual).toBe(expected);
    });
  });

});

var childProcess = require('child_process');
var config = require('config');
var crypto = require('../../lib/crypto');
var fs = require('fs');
var path = require('path');
var utils = require('../../lib/utils');
var sinon = require('sinon');

describe('lib/utils', function() {

  /**
   * TODO node-0.12.1 does not allow me to replace process.platform :(
   */
  describe('getHomeDir', function() { 

  });

  describe('getScribeDir', function() {
    var stubJoin,
        stubGetHomeDir;

    beforeEach(function() {
      stubGetHomeDir = sinon.stub(utils, 'getHomeDir');
      stubJoin = sinon.stub(path, 'join');
    });

    afterEach(function() {
      stubGetHomeDir.restore();
      stubJoin.restore();
    });

    it('should join the two path string correctly', function() {
      var homeDir = '/home/kg';
      var scribeDir = '.scribe';
      var expected = homeDir + '/' + scribeDir;
      stubGetHomeDir.returns(homeDir);
      stubJoin.withArgs('/home/kg', '.scribe').returns('/home/kg/.scribe');

      var actual = utils.getScribeDir();
      expect(actual).toEqual(expected);
    });

  });

  describe('isInstalled', function() {
    var stubExecSync;

    beforeEach(function() {
      stubExecSync = sinon.stub(childProcess, 'execSync');
    });

    afterEach(function() {
      stubExecSync.restore();
    });

    it('should return true for a successful ls command', function() {
      stubExecSync.returns(true);

      var actual = utils.isInstalled('');
      expect(actual).toBe(true);
    });

    it('should return false for a unsuccessful ls command', function() {
      stubExecSync.throws('Error');

      var actual = utils.isInstalled('');
      expect(actual).toBe(false);
    });

  });

  describe('createScribeDir', function() {
    var stubExecSync;

    beforeEach(function() {
      stubExecSync = sinon.stub(childProcess, 'execSync');
    });

    afterEach(function() {
      stubExecSync.restore();
    });

    it('should run the command successfully', function() {
      var dir = '.scribe';
      stubExecSync.returns(true);

      utils.createScribeDir(dir);
      expect(stubExecSync.callCount).toEqual(1);
    });

  });

  describe('destroyScribeDir', function() {
    var stubExecSync;

    beforeEach(function() {
      stubExecSync = sinon.stub(childProcess, 'execSync');
    });

    afterEach(function() {
      stubExecSync.restore();
    });

    it('should run the command successfully', function() {
      var dir = '.scribe';
      stubExecSync.returns(true);

      utils.destroyScribeDir(dir);
      expect(stubExecSync.callCount).toEqual(1);
    });

  });

  describe('getFiles', function() {
    var stubExecSync;

    beforeEach(function() {
      stubReadDirSync = sinon.stub(fs, 'readdirSync');
    });

    afterEach(function() {
      stubReadDirSync.restore();
    });

    it('should run the command successfully', function() {
      var dir = '.scribe';
      var expected = files = [
        'a.md',
        'b.md'
      ];
      stubReadDirSync.returns(files);

      var actual = utils.getFiles(dir);
      expect(stubReadDirSync.callCount).toEqual(1);
      expect(actual).toEqual(expected);
    });

  });

  describe('getFile', function() {
    var stubStatSync,
        stubReadFileSync,
        stubDecrypt;

    beforeEach(function() {
      stubStatSync = sinon.stub(fs, 'statSync');
      stubReadFileSync = sinon.stub(fs, 'readFileSync');
      stubDecrypt = sinon.stub(crypto, 'decrypt');
    });

    afterEach(function() {
      stubStatSync.restore();
      stubReadFileSync.restore();
      stubDecrypt.restore();
    });

    it('should run the command successfully', function() {
      var path = '/home/kg/.scribe';
      var password = 'this is a password';
      var file = { isFile: function() { return true; } };
      var encrypted = 'this is an encrypted message';
      var message = 'this is a message';

      stubStatSync.withArgs(path).returns(file);
      stubReadFileSync.withArgs(path).returns(encrypted);
      stubDecrypt.withArgs(encrypted, password).returns(message);

      var actual = utils.getFile(path, password);
      expect(actual).toEqual(message);
    });

  });

  describe('saveFile', function() {
    var stubEncrypt,
        stubExecSync;

    beforeEach(function() {
      stubEncrypt = sinon.stub(crypto, 'encrypt');
      stubWriteFileSync = sinon.stub(fs, 'writeFileSync');
    });

    afterEach(function() {
      stubEncrypt.restore();
      stubWriteFileSync.restore();
    });

    it('should run the command successfully', function() {
      var data = 'message';
      var path = '/home/kg/.scribe';
      var password = 'this is a password';

      stubEncrypt.withArgs(data, password).returns('encrypted message');
      stubWriteFileSync.withArgs(path, 'encrypted message').returns(true);

      utils.saveFile(data, path, password);
      expect(stubEncrypt.callCount).toEqual(1);
      expect(stubWriteFileSync.callCount).toEqual(1);
    });

  });

});

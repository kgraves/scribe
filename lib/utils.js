var childProcess = require('child_process');
var config = require('config');
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

/** 
  * Platform independent home directory getter
  *
  * @return {String}
  */
var getHomeDir = function() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

/**
 *
 */
var execOptions = {
  cwd: getHomeDir(),
  timeout: 5000
};

module.exports = {

  getHomeDir: getHomeDir,

  /**
   * Computes the path to the scribe directory
   *
   * @return {String}
   */
  getScribeDir: function() {
    return path.join(getHomeDir(), config.scribe.directory);
  },

  /**
   * Checks if scribe is already installed
   *
   * @param {String} directory Directory where scribe should have a folder
   * @return {Boolean} true if installed, false otherwise
   */
  isInstalled: function(directory) {
    var command = ['ls', directory];

    try {
      childProcess.execSync(command.join(' '), execOptions);
    } catch(e) {
      return false;
    }

    return true;
  },

  /**
   * Create project directory in `directory`.
   * This will create sub directories if needed
   *
   * @param {String] directory Directory in which to create .scribe directory
   * @throw {Error}
   */
  createScribeDir: function(directory) {
    var command = ['mkdir -p', directory];
    chlidProcess.execSync(command.join(' '), execOptions);
  },

  /**
   * Create project directory in `directory`.
   * This will create sub directories if needed
   *
   * @param {String] directory Directory in which to create .scribe directory
   * @throw {Error}
   */
  destroyScribeDir: function(directory) {
    var command = ['rm -r', directory];
    chlidProcess.execSync(command.join(' '), execOptions);
  },

  /**
   * Discovers all files in the given directory
   *
   * `directory` needs to be expanded (e.g. '/home/USER/Downloads). readdirSync
   * does not like unexpanded paths (e.g. '~/Downloads')
   *
   * @param {String} directory
   * @return {Array} files in `directory`
   */
  getFiles: function(directory) {
    return fs.readdirSync(directory);
  },

  /**
   * Decrypts and reads the contents of a file at the given path
   *
   * @param {String} path
   * @param {String} password
   * @return {String} file contents, or an emtpy string on error
   */
  getFile: function(path, password) {
    try {
      var file = fs.statSync(path);
      if (file.isFile()) {
        var encrypted = fs.readfileSync(path);
        return crypto.decrypt(encrypted, password);
      } else {
        return '';
      }
    } catch(e) {
      return '';
    }
  }

  /**
   * Encrypt `data` and save the file to the given path
   *
   * @param {String} data
   * @param {String} path
   * @param {String} password
   */
  saveFile: function(data, path, password) {
    var encrypted = crypto.encrypt(data, password);
    fs.writeFileSync(path, encrypted);
  }

};

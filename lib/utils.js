var childProcess = require('child_process');
var config = require('config');
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
   *
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
  }


};

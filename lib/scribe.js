var git = require('./git');
var utils = require('./utils');

module.exports = {

  /**
   * Installs scribe
   *
   * includes:
   * - create scribe dir
   * - initialize git repo in scribe dir
   *
   * @return {Boolean} True if installed successfully, false otherwise.
   */
  install: function() {
    if (!utils.isInstalled(utils.getScribeDir())) {
      try {
        utils.createScribeDir(config.scribe.directory);
        git.init();
      } catch(e) {
        return false;
      }
    }

    return true;
  },

  /**
   * Uninstalls scribe
   *
   * includes:
   * - destroying scribe dir
   *
   * @return {Boolean} True if uninstalled successfully, false otherwise.
   */
  uninstall: function() {
    if (utils.isInstalled(utils.getScribeDir())) {
      try {
        utils.destroyScribeDir(config.scribe.directory);
      } catch(e) {
        return false;
      }
    }

    return true;
  }

};

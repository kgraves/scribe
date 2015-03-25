var git = require('./git');
var utils = require('./utils');

module.exports = {

  /**
   * Initializes/installs scribe
   *
   * @return {Boolean} True if installed successfully, false otherwise.
   */
  init: function() {
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

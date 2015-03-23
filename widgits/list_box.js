var blessed = require('blessed');

/**
 * A very simple list factory
 */
module.exports = {
  /**
   * TODO
   */
  create: function(options) {
    var list = blessed.list(options);
    return list;
  },

  /**
   * A factory method for creating a file browser list.
   *
   * This is used to create the file browser list in the main screen to select
   * notes.
   *
   * @param {Object} options An optional param, that will override any default
   * options added by this function.
   * @return {Object} a blessed list object
   */
  createFileBrowserList: function(options) {
    var list = blessed.list(options);
    // TODO add default styling/options here
    return list;
  }
};

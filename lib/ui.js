var blessed = require('blessed');

/**
 * Collection of functions that create scribe's UI
 */

/**
 * create the programs main screen
 *
 * @return {Object} blessed.screen
 */
var createScreen = function() {
  return blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'scribe'
  });
};

/**
 *
 */
var createFileBrowser = function(screen) {

};

/**
 *
 */
var createEditor = function(screen) {

};

/**
 *
 */
var createStatusBar = function(screen) {

};

/**
 *
 */
var createLoginModal = function(screen) {

};

/**
 *
 */
var init = function() {
  var screen = createScreen();
  var fileBrowser = createFileBrowser(screen);
  var editor = createEditor(screen);
  var statusBar = createStatusBar(screen);
  var loginModal = createLoginModal(screen);

  return screen;
};

module.exports = {
  init: init
};

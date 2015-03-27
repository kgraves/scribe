/**
 * This module is being used for now instead of a git wrapper.
 * These functions exec a child process and execute git commands.
 *
 * I want to eventually migrate to using a git wrapper library instead of this
 * approach.
 *
 * NOTE all of these function use `child_process.execSync`.
 * Intuitively, these are all syncronous functions, and therefore will be
 * blocking. If this becomes a hindrance, `child_process.exec` should be used,
 * although most of this module, and everything that calls this module, will
 * need to be refactored.
 */

var childProcess = require('child_process');
var config = require('config');
var path = require('path');
var utils = require('./utils');

var execOptions = {
  cwd: utils.getScribeDir()
};

module.exports = {

  /**
   * performs a `git init`
   *
   * @throw {Error}
   */
  init: function() {
    childProcess.execSync('git init', execOptions);
  },

  /**
   * performs a `git a .`
   *
   * @throw {Error}
   */
  add: function() {
    childProcess.execSync('git add .', execOptions);
  },

  /**
   * performs a `git commit -m [MESSAGE]`
   *
   * @param {String} message A message for the commit
   * @throw {Error}
   */
  commit: function(message) {
    var command = ['git commit -m', message];
    childProcess.execSync(command.join(' '), execOptions);
  },

  /**
   * performs a `git clone [REPO_URL]`
   *
   * @param {String} repoUrl The url to the repository to clone
   * @throw {Error}
   */
  clone: function(repoUrl) {
    var command = ['git clone', repoUrl];
    childProcess.execSync(command.join(' '), execOptions);
  },

  /**
   * performs a `git add remote [REMOTE_NAME] [REMOTE_URL]`
   *
   * @param {String} remoteName The name of the remote to add
   * @param {String} remoteUrl The url of the remote to add
   * @throw {Error}
   */
  addRemote: function(remoteName, remoteUrl) {
    var command = ['git remote add ', remoteName, remoteUrl];
    childProcess.execSync(command.join(' '), execOptions);
  },

  /**
   * performs a `git pull --rebase`
   *
   * @throw {Error}
   */
  pull: function() {
    var command = ['git pull --rebase', remoteName, remoteUrl];
    childProcess.execSync(command.join(' '), execOptions);
  },

  /**
   * performs a `git push`
   *
   * @throw {Error}
   */
  push: function() {
    childProcess.execSync('git push', execOptions);
  },

};

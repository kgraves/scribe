var blessed = require('blessed');
var config = require('config');
var crypto = require('crypto');
var fs = require('fs');
var scribe = require('./lib/scribe');
var ui = require('./lib/ui');
var utils = require('./lib/utils');
var yaml = require('js-yaml');

// install
/**
if (!scribe.install()) {
  console.error('There was an error installing scribe...uh oh :(');
  process.exit(1);
}
*/

// create screen
// TODO add options for login
// var screen = ui.init();

var screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'scribe'
});
// screen.title = 'scribe';

/**
 * create editor (textarea)
 */
var editor = blessed.textarea({
  parent: screen,
  border: 'line',
  style: {
    bg: 'black',
    fg: 'white'
  },
  keys: true,
  vi: true,
  top: 0,
  left: '25%',
  height: '99%',
  width: '75%',
});

// editor.focus();

// create selectable list
// var list = blessed.list(config.layouts.list);
var fileList = blessed.list({
  parent: screen,
  align: 'center',
  mouse: true,
  keys: true,
  vi: true,
  width: '25%',
  height: '99%',
  border: 'line',
  top: 0,
  left: 0,
  style: {
    fg: 'white',
    bg: 'black',
    selected: {
      bg: 'yellow'
    }
  },
  items: utils.getFiles('/home/kg/Documents/notes')
  // items: utils.getFiles(utils.getScribeDir())
  // items: [
    // 'dev.md',
    // 'new_machine_setup.md',
    // 'meeting_03012015.md',
  // ]
});

fileList.select(0);

fileList.on('select', function(item) {
  var path = '/home/kg/Documents/notes/' + item.getText();
  var contents = fs.readFileSync(path).toString('utf8');
  editor.setValue(contents);
  screen.render();

  /**
  var contents = fs.readFile(path, function(err, buffer) {
    var contents = buffer.toString('utf8');
    editor.setValue(contents);
    screen.render();
  });
  */

  // var text = item.getText();
  // console.log('you selected: ' + text);
});

fileList.focus();

/**
 * create status line
 */
var statusLine = blessed.textbox({
  parent: screen,
  border: 'line',
  style: {
    bg: 'black',
    fg: 'white'
  },
  keys: true,
  top: '95%',
  left: 0,
  heigth: '1%', //'5%',
  width: '100%',
  inputOnFocus: true
});

statusLine.on('submit', function(data) {
  // TODO check available commands, and execute
});

// statusLine.focus();

// create centered login popup box
/**
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'hello hello',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});
*/

// key setup

// left
screen.key(['C-h', 'C-[', '['], function(ch, key) {
  console.log('move left');
  fileList.focus();
});

// right
screen.key(['C-l', 'C-]', ']'], function(ch, key) {
  console.log('move right');
  editor.focus();
});

// focus on the status line
// TODO should focus on editor? once submited
screen.key([':'], function(ch, key) {
  console.log('move status line');
  statusLine.focus();
});

// exit
screen.key(['escape', 'q'], function(ch, key) {
  return process.exit(0);
});

// screen.append(box);
screen.render();

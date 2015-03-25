var blessed = require('blessed');
var config = require('config');
var scribe = require('scribe');
var yaml = require('js-yaml');

// install
if (!scribe.init()) {
  console.error('There was an error installing scribe...uh oh :(');
  process.exit(1);
}

/**
+-----------------------------------------------+
|         |                                     |
|         |                                     |
|         |                                     |
|         |                                     |
|         |                                     |
| file    |              editor                 |
| explorer|                                     |
|         |                                     |
|         |                                     |
|         |                                     |
|         |                                     |
|         |                                     |
|-----------------------------------------------|
|___________________status bar__________________+
*/

// create the programs main screen
var screen = blessed.screen(config.layouts.screen);
/**
var screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'scribe'
});
// screen.title = 'scribe';
*/

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
    fg: 'blue',
    bg: 'default',
    selected: {
      bg: 'green'
    }
  },
  items: [
    'dev.md',
    'new_machine_setup.md',
    'meeting_03012015.md',
  ]
});

fileList.select(0);

fileList.on('select', function(item) {
  var text = item.getText();

  if (text === 'exit') {
    process.exit(0);
  } else {
    console.log('you selected: ' + text);
  }
});

fileList.focus();

/**
 * create editor (textarea)
 */
var editor = blessed.textarea({
  parent: screen,
  border: 'line',
  style: {
    bg: 'white',
    fg: 'black'
  },
  keys: true,
  vi: true,
  top: 0,
  left: '25%',
  height: '99%',
  width: '75%',
});

// editor.focus();

/**
 * create status line
 */
var statusLine = blessed.textbox({
  parent: screen,
  style: {
    bg: 'white',
    fg: 'black'
  },
  keys: true,
  top: '95%',
  left: 0,
  heigth: '1%', //'5%',
  width: '100%',
  inputOnFocus: true
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
screen.key(['escape', 'q'], function(ch, key) {
  return process.exit(0);
});

// focus on the status line
// TODO should focus on editor? once submited
screen.key([':'], function(ch, key) {
  statusLine.focus();
});

// screen.append(box);
screen.render();

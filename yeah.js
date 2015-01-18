#! /usr/bin/env node

var program = require("commander"),
    iosHelper = require('./lib/iosHelper');

program
  .version('1.0.3')
  .usage('emulate')
  .parse(process.argv);

if(!program.args.length) {
  program.help();
} else {
  init(program.args[0])  
}

function init(baseCommand){
  switch(baseCommand) {
    case "emulate":
      iosHelper.emulate(program.args[1])
      break;
    default:
      program.help()
      break;
  }
}


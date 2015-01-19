var fs = require('fs'),
    chalk = require("chalk"),
    shell = require('./shellHelper'),
    exec = require('child_process').exec,
    inquirer = require('inquirer'),
    devices = {};

devices = [
  "1F9155A4-6BD2-417D-B907-5CA0D400CFF7",
  "839AEFCD-E52E-4495-BC74-1B8D04E5CF70",
  "E3F43DB9-4413-465F-BA83-D2E112CCD1B0",
  "B6F5CACA-E532-4428-A27C-55D245EFB85D",
  "09BB2B36-897B-4183-B3E6-71EB71F9B10C",
  "9CD95D65-4E77-4AE4-A509-907117F2E621",
  "A3CB56C3-8DF8-4C73-B9B5-488D89BBD3FE",
  "1790E0C7-26BE-4255-8125-4AE49A1159F3",
  "A3141045-ADB2-48E2-AF8F-5E789046A563",
  "67647349-232C-4DD2-A299-44D2E1961551"
];

var choices = ["iPhone 4s","iPhone 5","iPhone 5s","iPhone 6 Plus","iPhone 6","iPad 2","iPad Retina","iPad Air","Resizable iPhone","Resizable iPad"],
uiChoices = []
for(i = 0; i < choices.length; i++) {
  uiChoices.push({name: choices[i], value: i})
}

var question = {
  type: "list",
  name: "device",
  message: "Which device would you like to emulate?",
  choices: uiChoices
}

exports.emulate = function(device){
  var udid,
      task,
      baseTask = "open -n -a 'iOS Simulator' --args -CurrentDeviceUDID ";

  if(device){
    console.log(chalk.green("Emulator spinning up with device: " + device))
    task = baseTask + devices[device]
    exec(task)
  } else {
    inquirer.prompt([question], function( answers ) {
      deviceIndex = parseInt(answers.device)
      udid = devices[deviceIndex]
      task = baseTask + udid
      exec(task);
    });
  }
}


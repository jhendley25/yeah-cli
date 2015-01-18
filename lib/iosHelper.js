var fs = require('fs'),
    chalk = require("chalk"),
    shell = require('./shellHelper'),
    exec = require('child_process').exec,
    prompt = require('prompt'),
    devices = {};

// nifty little helper function to select object by key index
var helper = {
  key: function(n) {
    return this[ Object.keys(this)[n] ];
  }
};

function key(obj, idx) {
  return helper.key.call(obj, idx);
}

devices = {
  iphone4s:         "1F9155A4-6BD2-417D-B907-5CA0D400CFF7",
  iphone5:          "839AEFCD-E52E-4495-BC74-1B8D04E5CF70",
  iphone5s:         "E3F43DB9-4413-465F-BA83-D2E112CCD1B0",
  iphone6plus:      "B6F5CACA-E532-4428-A27C-55D245EFB85D",
  iphone6:          "09BB2B36-897B-4183-B3E6-71EB71F9B10C",
  ipad2:            "9CD95D65-4E77-4AE4-A509-907117F2E621",
  ipadRetina:       "A3CB56C3-8DF8-4C73-B9B5-488D89BBD3FE",
  ipadAir:          "1790E0C7-26BE-4255-8125-4AE49A1159F3",
  resizableiphone:  "A3141045-ADB2-48E2-AF8F-5E789046A563",
  resizableipad:    "67647349-232C-4DD2-A299-44D2E1961551"
};

var uiChoices = "1. iPhone 4s \n2. iPhone 5 \n3. iPhone 5s \n4. iPhone 6 Plus \n5. iPhone 6 \n6. iPad 2 \n7. iPad Retina \n8. iPad Air \n9. Resizable iPhone \n10. Resizable iPad \n"

exports.emulate = function(device){
  var udid,
      task,
      baseTask = "open -a 'iOS Simulator' --args -CurrentDeviceUDID ";

  if(device){
    console.log(chalk.green("Emulator spinning up with device: " + device))
    task = baseTask + devices[device]
    exec(task)
  } else {
    console.log(chalk.green("Enter the number of the device you would like to emulate:\n")+uiChoices)

    prompt.start()
    prompt.get(['Device Number'], function(err, result){
      var selection = parseInt(key(result, 0)) - 1 //because science
      udid = key(devices, selection)
      task = baseTask + udid
      exec(task);

    })
  }
}


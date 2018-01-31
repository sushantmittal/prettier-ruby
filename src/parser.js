"use strict";

function parse(text) {
  const execSync = require('child_process').execSync

  const getAstCommand =
    "cd ../../aceinvoice-web-project/aceinvoice-web;rails runner 'print GenerateAstJson.process(" + JSON.stringify(text) + ")'";

  const a = execSync(getAstCommand).toString()

  // console.log(a)
  return JSON.parse(a)[0];
}

module.exports = parse;

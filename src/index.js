"use strict";

const parse = require("./parser");
const print = require("./printer");

const languages = [
  {
    name: "Ruby",
    parsers: ["ruby"],
    tmScope: "text.html.rb",
    aceMode: "rb",
    extensions: [ ".rb" ],
    vscodeLanguageIds: ["rb"],
    linguistLanguageId: 280
  }
];

const parsers = {
  ruby: {
    parse,
    astFormat: "ruby"
  }
};

const printers = {
  ruby: {
    print
  }
};

module.exports = {
  languages,
  printers,
  parsers
};

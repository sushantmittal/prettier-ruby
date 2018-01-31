"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;

const printNthRef = (path, options, print) => {
  return concat(['$', path.call(print, 'children', 0)])
}

module.exports = printNthRef;

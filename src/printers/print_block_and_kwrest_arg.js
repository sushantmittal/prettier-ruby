"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;

const R = require('ramda')

const printBlockAndKwrestArg = (path, options, print) => {
  const nodeType = path.getValue().type;

  return concat([
    R.equals(nodeType, "blockarg") ? "&" : "**",
    path.call(print, "children", 0)
  ])
}

module.exports = printBlockAndKwrestArg;

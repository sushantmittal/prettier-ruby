"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const group = docBuilders.group;
const indent = docBuilders.indent;
const line = docBuilders.line;

const printOptarg = (path, options, print) => {
  const name = path.call(print, "children", 0);
  const value = path.call(print, "children", 1);

  return group(
    concat([
      name,
      " =",
      indent(
        concat([line, value])
      )
    ])
  )
}

module.exports = printOptarg;

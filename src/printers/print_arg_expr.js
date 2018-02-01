"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const group = docBuilders.group;
const indent = docBuilders.indent;
const softline = docBuilders.softline;

const printArgExpr = (path, options, print) => {
  return group(
    concat([
      "(",
      indent(
        concat([softline, path.call(print, "children", 0)]),
      ),
      softline,
      ")"
    ])
  )
}

module.exports = printArgExpr;

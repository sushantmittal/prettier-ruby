"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const group = docBuilders.group;
const indent = docBuilders.indent;
const softline = docBuilders.softline;

const printArgExpr = (path, options, print) => {
  const body = path.call(print, "children", 0);

  return R.isEmpty(body)
    ? "()"
    : group(
        concat([
          "(",
          indent(
            concat([softline, path.call(print, "children", 0)])
          ),
          softline,
          ")"
        ])
      )
}

module.exports = printArgExpr;

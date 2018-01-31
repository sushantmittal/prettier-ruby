"use strict";

const docBuilders = require("prettier").doc.builders;

const concat = docBuilders.concat;
const join = docBuilders.join;
const line = docBuilders.line;
const group = docBuilders.group;
const indent = docBuilders.indent;
const hardline = docBuilders.hardline;
const softline = docBuilders.softline;

const R = require('ramda')

const printSclass = (path, options, print) => {
  const object = path.call(print, "children", 0);
  const body = path.call(print, "children", 1);

  return R.isEmpty(body)
    ? group(
        concat([
          "class <<",
          indent(
            concat([line, object, "; end"])
          )
        ])
      )
    : concat([
        group(
          concat([
            "class <<",
            indent(
              concat([line, object])
            )
          ])
        ),
        indent(
          concat([hardline, body])
        ),
        hardline,
        "end"
      ]);
}

module.exports = printSclass;

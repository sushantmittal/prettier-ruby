"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const indent = docBuilders.indent;
const softline = docBuilders.softline;
const group = docBuilders.group;
const line = docBuilders.line;
const join = docBuilders.join;

const R = require('ramda')

const findArgsContent = (path, print, args) =>
  R.values(
    R.mapObjIndexed(
      (_, index) => path.call(print, "children", 2, index),
      args
    )
  )

const printOperation = argsContent => {
  return R.isEmpty(argsContent)
    ? "[]"
    : concat([
        "[",
        indent(
          concat([
            softline,
            join(
              concat([",", line]),
              argsContent
            )
          ])
        ),
        softline,
        "]"
      ]);
}

const printIndexReference = (path, options, print) => {
  const receiver = path.call(print, "children", 0);
  const args = R.remove(0, 2, path.getValue().children);
  const argsContent = findArgsContent(path, print, args);

  return group(
    concat([
      receiver,
      printOperation(argsContent)
    ])
  )
}

module.exports = printIndexReference;

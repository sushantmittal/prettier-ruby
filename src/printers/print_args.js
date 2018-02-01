"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const group = docBuilders.group;
const line = docBuilders.line;
const join = docBuilders.join;

const R = require('ramda')

const findArgsWithType = (path, print) => 
  R.values(
    R.mapObjIndexed(
      (node, index) => { return { "type": node.type, "content": path.call(print, "children", index) } },
      path.getValue().children
    )
  )

const findNormalAndShadowArgs = argsWithType =>
  R.map(
    R.pluck("content"),
    R.partition(
      R.propEq("type", "shadowarg"),
      argsWithType
    )
  )

const printArgsWithDelimiters = args =>
  join(
    concat([",", line]),
    args
  )

const printShadowArgsWithDelimiters = args =>
  R.isEmpty(args)
  ? ""
  : concat([
      concat([";", line]),
      printArgsWithDelimiters(args)
    ])

const printArgs = (path, options, print) => {
  const argsWithType = findArgsWithType(path, print);
  const [shadowArgs, normalArgs] = findNormalAndShadowArgs(argsWithType);

  return group(
    concat([
      printArgsWithDelimiters(normalArgs),
      printShadowArgsWithDelimiters(shadowArgs)
    ])
  )
}

module.exports = printArgs;

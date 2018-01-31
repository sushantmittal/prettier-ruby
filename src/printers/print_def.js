"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const group = docBuilders.group;
const indent = docBuilders.indent;
const hardline = docBuilders.hardline;
const softline = docBuilders.softline;

const R = require('ramda')

const defBody = methodBody =>
  concat([
    indent(
      concat([hardline, methodBody])
    ),
    hardline
  ])

const defSignature = methodName =>
  concat(['def ', methodName])


const defMethodArguments = methodArguments =>
  concat([
    "(",
    indent(
      concat([softline, methodArguments])
    ),
    softline,
    ")"
  ])

const defWithNoBodyAndArguments = methodName =>
  concat([
    defSignature(methodName),
    '; end'
  ])

const defWithNoArguments = (methodName, methodBody) =>
  concat([
    defSignature(methodName),
    defBody(methodBody),
    "end"
  ])

const fullDef = (methodName, methodArguments, methodBody) =>
  concat([
    group(
      concat([
        defSignature(methodName),
        defMethodArguments(methodArguments)
      ])
    ),
    defBody(methodBody),
    "end"
  ]);

const printDef = (path, options, print) => {
  const methodName = path.call(print, "children", 0);
  const methodArguments = path.call(print, "children", 1);
  const methodBody = path.call(print, "children", 2);

  if(R.and(R.isEmpty(methodBody), R.isEmpty(methodArguments))) {
    return defWithNoBodyAndArguments(methodName)
  } else if(R.isEmpty(methodArguments)) {
    return defWithNoArguments(methodName, methodBody)
  } else {
    return fullDef(methodName, methodArguments, methodBody)
  }
}


module.exports = printDef;

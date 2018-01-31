"use strict";

const R = require('ramda')

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;

const printConst = (path, options, print) => {
  const scopeName = path.call(print, 'children', 0);

  const scope = path.getValue().children[0];
  const scopeType = scope && scope.type;

  const constName = path.call(print, 'children', 1);

  return R.isEmpty(scopeName)
    ? constName
    : R.equals(scopeType, 'cbase')
      ? concat([scopeName, constName])
      : concat([scopeName, "::", constName])
}

module.exports = printConst;

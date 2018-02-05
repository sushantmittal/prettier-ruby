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
  );

const isMlhs = parentType => R.equals(parentType, "mlhs");

const printIndexParensContent = content =>
  concat([
    "[",
    indent(
      concat([
        softline,
        join(
          concat([",", line]),
          content
        )
      ])
    ),
    softline,
    "]"
  ]);

const printNormalOperationWithLHS = lhsContent =>
  concat([
    lhsContent,
    " =",
    indent(
      concat([line, value])
    )
  ]);

const printEmptyArgsOperation = () =>
  indent(
    concat([softline, ".[]=()"])
  );

const printMlhsOperation = (path, print, args) => {
  const argsContent = findArgsContent(path, print, args);

  return printIndexParensContent(argsContent);
}

const printNormalOperation = (path, print, args) => {
  const indices = R.remove(R.length(args) - 1, 1, args);
  const indicesContent = findArgsContent(path, print, indices);
  const value = R.last(args);

  return R.isEmpty(indices)
    ? printNormalOperationWithLHS("[]")
    : printNormalOperationWithLHS(printIndexParensContent(indicesContent))
}

const printOperation = (path, print) => {
  const args = R.remove(0, 2, path.getValue().children);
  const parent = path.getParentNode();
  const parentType = parent && parent.type;

  if(R.isEmpty(args)) {
    return printEmptyArgsOperation();
  } else if(isMlhs(parentType)) {
    return printMlhsOperation(path, print, args);
  } else {
    return printNormalOperation(path, print, args);
  }
}

const printIndexAssign = (path, options, print) => {
  const receiver = path.call(print, "children", 0);

  return group(
    concat([
      receiver,
      printOperation(path, print)
    ])
  )
}

module.exports = printIndexAssign;

"use strict";

const printIndexReference = require("./send/print_index_reference");
const printIndexAssign = require("./send/print_index_assign");

const R = require('ramda')

const INDEX_REFERENCE = "[]";
const INDEX_ASSIGN    = "[]="
const ASSIGN_SUFFIX   = "=";

const UNARY_OPERATORS = ["!", "~", "-@", "+@"];
const BINARY_OPERATORS = ["+", "-", "*", "/", "&", "|", "&&", "||", "<<", ">>", "==", "===", "!=", "<=", "<",
  "<=>", ">", ">=", "=~", "!~", "^", "**", "%"];

const isSelectorBinaryOperator = selector =>
  R.gte(
    R.indexOf(selector, BINARY_OPERATORS),
    0
  );

const isBinaryOperator = (selector, argumentNodes) =>
  R.and(
    isSelectorBinaryOperator(selector),
    R.equals(
      R.length(argumentNodes),
      1
    ),
    R.complement(
      R.equals(
        R.prop("type", argumentNodes[0]),
        "splat"
      )
    )
  );

const isUnaryOperator = selector =>
  R.gte(
    R.indexOf(
      selector,
      UNARY_OPERATORS
    ),
    0
  );

const isAssignment = selector => R.equals(selector.slice(-1), ASSIGN_SUFFIX);

const isMlhs = parentType => R.equals(parentType, "mlhs");

const isAttributeAssignment = (selector, parentType) =>
  R.and(
    R.complement(isSelectorBinaryOperator(selector)),
    R.complement(isUnaryOperator(selector)),
    isAssignment(selector),
    R.complement(isMlhs(parentType))
  );

const printNonIndexEmitters = (path, options, print, selector) => {
  const argumentNodes = R.remove(0,
    2,
    R.prop("children", path.getValue())
  );
  const parent = path.getParentNode();
  const parentType = parent && parent.type;

  if(isBinaryOperator(selector, argumentNodes)) {
    return printBinary(path, options, print);
  } else if(isUnaryOperator(selector)) {
    return printUnary(path, options, print);
  } else if(isAttributeAssignment(selector, parentType)) {
    return printAttributeAssignment(path, options, print);
  } else {
    return printRegular(path, options, print);
  }
}

const printSend = (path, options, print) => {
  const selector = path.call(print, "children", 1);

  switch (selector) {
    case INDEX_REFERENCE:
      return printIndexReference(path, options, print);
    case INDEX_ASSIGN:
      return printIndexAssign(path, options, print);
    default:
      return printNonIndexEmitters(path, options, print, selector);
  }
}

module.exports = printSend;

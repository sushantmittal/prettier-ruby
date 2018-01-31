"use strict";

const R = require('ramda')

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const hardline = docBuilders.hardline;

const printBegin = require('./printers/print_begin')
const printClass = require('./printers/print_class')
const printSclass = require('./printers/print_sclass')
const printConst = require('./printers/print_const')
const printDef = require('./printers/print_def')
const printDefs = require('./printers/print_defs')
const printVariable = require('./printers/print_variable')
const printNthRef = require('./printers/print_nth_ref')

function genericPrint(path, options, print) {
  const node = path.getValue();

  if (!node) {
    return "";
  } else if (R.equals(typeof node, "string")) {
    return node;
  } else if (R.equals(node.type, undefined)) {
    return String(node);
  } else {
    const parent = path.getParentNode();
    const parentType = parent && parent.type;
    const code = printNode(path, options, print);

    return !parentType ? concat([code, hardline]) : code;
  }
}

function printNode(path, options, print) {
  const node = path.getValue();

  switch (node.type) {
    case "begin":
      return printBegin(path, options, print);
    case "class":
      return printClass(path, options, print)
    case "sclass":
      return printSclass(path, options, print)
    case 'const':
      return printConst(path, options, print)
    case 'ivar':
    case 'lvar':
    case 'cvar':
    case 'gvar':
    case 'back_ref':
      return printVariable(path, options, print)
    case 'nth_ref':
      return printNthRef(path, options, print)
    case 'def':
      return printDef(path, options, print)
    case 'defs':
      return printDefs(path, options, print)
    default:
      return "Have not implemented type " + node.type + " yet.";
  }
}

module.exports = genericPrint;

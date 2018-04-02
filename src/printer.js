"use strict";

const R = require("ramda")

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const hardline = docBuilders.hardline;

const { printWithPassedOptions } = require("./utils/printer_util");
const printBegin = require("./printers/print_begin");
const printClass = require("./printers/print_class");
const printSclass = require("./printers/print_sclass");
const printConst = require("./printers/print_const");
const printDef = require("./printers/print_def");
const printDefs = require("./printers/print_defs");
const printVariable = require("./printers/print_variable");
const printNthRef = require("./printers/print_nth_ref");
const printArgs = require("./printers/print_args");
const printArgExpr = require("./printers/print_arg_expr");
const printBlockAndKwrestArg = require("./printers/print_block_and_kwrest_arg");
const printOptarg = require("./printers/print_optarg");
const printKwoptarg = require("./printers/print_kwoptarg");
const printKwarg = require("./printers/print_kwarg");
const printRestarg = require("./printers/print_restarg");
const printArgument = require("./printers/print_argument");
const printBlockPass = require("./printers/print_block_pass");
const printSingleton = require("./printers/literal/print_singleton");
const printSend = require("./printers/print_send");

function genericPrint(path, options, print) {
  const node = path.getValue();
  const nodeType = R.prop("type", node);

  if (!node) {
    return "";
  } else if (R.equals(typeof node, "string")) {
    return node;
  } else if (R.equals(nodeType, undefined)) {
    return String(node);
  } else {
    const parent = path.getParentNode();
    const parentType = parent && parent.type;
    const codeAndTerminatedInfo = printNode(path, options, print);
    const code = printWithPassedOptions(
      codeAndTerminatedInfo[0],
      R.merge({ nodeType: nodeType, isTerminatedNode: codeAndTerminatedInfo[1] }, options)
    )

    return !parentType ? concat([code, hardline]) : code;
  }
}

function printNode(path, options, print) {
  const node = path.getValue();
  const nodeType = R.prop("type", node);

  switch (nodeType) {
    case "begin":
      return printBegin(path, options, print);
    case "class":
      return printClass(path, options, print);
    case "sclass":
      return printSclass(path, options, print);
    case "const":
      return printConst(path, options, print);
    case "ivar":
    case "lvar":
    case "cvar":
    case "gvar":
    case "back_ref":
      return printVariable(path, options, print);
    case "nth_ref":
      return printNthRef(path, options, print);
    case "def":
      return printDef(path, options, print);
    case "defs":
      return printDefs(path, options, print);
    case "args":
      return printArgs(path, options, print);
    case "arg_expr":
      return printArgExpr(path, options, print);
    case "blockarg":
    case "kwrestarg":
      return printBlockAndKwrestArg(path, options, print);
    case "optarg":
      return printOptarg(path, options, print);
    case "kwoptarg":
      return printKwoptarg(path, options, print);
    case "kwarg":
      return printKwarg(path, options, print);
    case "restarg":
      return printRestarg(path, options, print);
    case "arg":
    case "shadowarg":
      return printArgument(path, options, print);
    case "block_pass":
      return printBlockPass(path, options, print);
    case "self":
    case "true":
    case "false":
    case "nil":
      return printSingleton(path, options, print);
    // case "send":
    //   return printSend(path, options, print);
    default:
      return ["Have not implemented type " + nodeType + " yet.", true];
  }
}

module.exports = genericPrint;

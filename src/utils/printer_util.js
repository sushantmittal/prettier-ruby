"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const indent = docBuilders.indent;
const softline = docBuilders.softline;
const hardline = docBuilders.hardline;
const group = docBuilders.group;

const R = require('ramda')

const NO_INDENT = ["rescue", "ensure"];

const indentationAllowed = nodeType => 
  R.lt(
    R.indexOf(nodeType, NO_INDENT),
    0
  );

const contentAfterIndentation = (content, isIndentationRequired, nodeType) => {
  if(R.and(isIndentationRequired, indentationAllowed(nodeType))) {
    if(R.isEmpty(content)) {
      return hardline
    } else {
      return concat([
        indent(
          concat([hardline, content])
        ),
        hardline
      ])
    }
  } else {
      return content;
  }
}

const contentAfterParenthesized = (content, isParenthesesRequired, isTerminatedNode) => {
  if(R.and(R.complement(isTerminatedNode), isParenthesesRequired)) {
    if(R.isEmpty(content)) {
      return "()"
    } else {
      return group(
        concat([
          "(",
          indent(
            concat([softline, content]),
          ),
          softline,
          ")"
        ])
      )
    }
  } else {
      return content;
  }
}

const printWithPassedOptions = (content, options) => {
  const nodeType = R.prop("nodeType", options);
  const isTerminatedNode = R.prop("isTerminatedNode", options);
  const isParenthesesRequired = R.prop("isParenthesesRequired", options);
  const isIndentationRequired = R.prop("isIndentationRequired", options);

  content = contentAfterIndentation(content, isIndentationRequired, nodeType);
  content = contentAfterParenthesized(content, isParenthesesRequired, isTerminatedNode);
}

module.exports = { printWithPassedOptions };

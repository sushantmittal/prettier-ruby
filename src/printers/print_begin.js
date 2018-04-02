"use strict";

const R = require('ramda')

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const join = docBuilders.join;
const hardline = docBuilders.hardline;

const TERMINATING_PARENT = [null, 'interpolated', 'dyn_str_body'];

const isTerminated = (path) => {
  const node = path.getValue();

  return R.isEmpty(node.children);
}

const printContent = (path, options, print) => {
  const parent = path.getParentNode();
  const parentType = parent && parent.type;

  if(R.and(isTerminated(path), R.lt(R.indexOf(parentType, TERMINATING_PARENT), 0))) {
    return "()"
  } else {
    switch(parentType) {
      case 'def': {
        return join(
          hardline,
          path.map(print, "children")
        )
      }
      default: {
        return join(
          concat([hardline, hardline]),
          path.map(print, "children")
        )
      }
    }
  }
}

const printBegin = (path, options, print) => {
  return [printContent(path, options, print), isTerminated(path)];
}

module.exports = printBegin;

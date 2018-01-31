"use strict";

const printVariable = (path, options, print) => {
  return path.call(print, 'children', 0)
}

module.exports = printVariable;

"use strict";

const printVariable = (path, options, print) => path.call(print, 'children', 0);

module.exports = printVariable;

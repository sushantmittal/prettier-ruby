"use strict";

const printArgument = (path, options, print) => path.call(print, "children", 0);

module.exports = printArgument;

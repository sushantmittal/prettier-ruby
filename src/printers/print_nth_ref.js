"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;

const printNthRef = (path, options, print) => concat(['$', path.call(print, 'children', 0)]);

module.exports = printNthRef;

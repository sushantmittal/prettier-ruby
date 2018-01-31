"use strict";

const R = require('ramda')

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const line = docBuilders.line;
const group = docBuilders.group;
const indent = docBuilders.indent;
const hardline = docBuilders.hardline;
const softline = docBuilders.softline;

const printClass = (path, options, print) => {
  const className = path.call(print, "children", 0);
  const parentClassName = path.call(print, "children", 1);
  const classBody = path.call(print, "children", 2);

  return R.isEmpty(classBody)
    ? group(
        concat([
          className,
          " =",
          indent(
            concat([line,
              R.isEmpty(parentClassName)
                ? "Class.new"
                : concat([
                    "Class.new(",
                    indent(
                      concat([softline, parentClassName])
                    ),
                    softline,
                    ")"
                  ])
            ])
          )
        ])
      )
    : concat([
        group(
          concat([
            "class ",
            className,
            R.isEmpty(parentClassName)
              ? ""
              : concat([
                  " <",
                  indent(
                    concat([line, parentClassName])
                  )
                ])
          ])
        ),
        indent(
          concat([hardline, classBody])
        ),
        hardline,
        "end"
      ]);
}

module.exports = printClass;

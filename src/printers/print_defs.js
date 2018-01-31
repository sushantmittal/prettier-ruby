"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const group = docBuilders.group;
const indent = docBuilders.indent;
const hardline = docBuilders.hardline;
const softline = docBuilders.softline;

const R = require('ramda')

const printSubjectWithoutParentheses = (path) => {
  const children = path.getValue().children;
  const subjectNode = children && children[0];
  const subjectType = subjectNode && subjectNode.type;

  switch(subjectType) {
    case 'self':
      return true
    case 'const':
      return R.isNil(subjectNode.children[0])
    case 'send':
      const receiver = subjectNode.children[0]
      const args = R.remove(0, 2, subjectNode.children)

      return R.and(R.isNil(receiver), R.isEmpty(args))
    default:
      return false
  }
}

const defsSignature = (path, print, methodName, methodArguments) => {
  const subject = path.call(print, "children", 0);

  return group(
    concat([
      'def ',
      printSubjectWithoutParentheses(path)
        ? concat([
            subject,
            indent(
              concat([softline, '.', methodName, defsMethodArguments(methodArguments)])
            )
          ])
        : concat([
            '(',
            indent(
              concat([
                softline,
                subject
              ])
            ),
            softline,
            ')',
            indent(
              concat([softline, '.', methodName, defsMethodArguments(methodArguments)])
            )
          ])
    ])
  )
}

const defsBody = methodBody =>
  concat([
    indent(
      concat([hardline, methodBody])
    ),
    hardline
  ])

const defsMethodArguments = methodArguments => {
  return R.isEmpty(methodArguments)
    ? ""
    : concat([
        "(",
        indent(
          concat([softline, methodArguments])
        ),
        softline,
        ")"
      ])
}

const defsWithNoBodyAndArguments = (path, print, methodName, methodArguments) =>
  concat([
    defsSignature(path, print, methodName, methodArguments),
    '; end'
  ])

const defsWithNoArguments = (path, print, methodName, methodBody, methodArguments) =>
  concat([
    defsSignature(path, print, methodName, methodArguments),
    defsBody(methodBody),
    "end"
  ])

const fullDefs = (path, print, methodName, methodArguments, methodBody) =>
  concat([
    defsSignature(path, print, methodName, methodArguments),
    defsBody(methodBody),
    "end"
  ]);

const printDefs = (path, options, print) => {
  const methodName = path.call(print, "children", 1);
  const methodArguments = path.call(print, "children", 2);
  const methodBody = path.call(print, "children", 3);

  if(R.and(R.isEmpty(methodBody), R.isEmpty(methodArguments))) {
    return defsWithNoBodyAndArguments(path, print, methodName, methodArguments)
  } else if(R.isEmpty(methodArguments)) {
    return defsWithNoArguments(path, print, methodName, methodBody, methodArguments)
  } else {
    return fullDefs(path, print, methodName, methodArguments, methodBody)
  }
}

module.exports = printDefs;

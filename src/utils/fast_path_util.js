"use strict";

const parenthesizedCall = (path, print, args) => {
  return path.call(
    path => print(path, { isParenthesesRequired: true }),
    ...args
  )
}

const indentedCall = (path, print, args) => {
  return path.call(
    path => print(path, { isIndentationRequired: true }),
    ...args
  )
}

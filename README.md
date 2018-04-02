
## prettier-ruby

prettier-ruby is an attempt to bring an opinionated code formatting feature to ruby.
It is part of larger eco system being built around [prettier](https://prettier.io/) .

Please watch [this video](https://www.youtube.com/watch?v=hkfBvpEfWdA) to 
understand both "what prettier does" and "how prettier works".

This tool is using https://github.com/whitequark/parser to convert existing
ruby code into AST.

There is a tool called [unparser](https://github.com/mbj/unparser)
which writes ruby code from the given AST.

In a way this tool is trying to do what unparser is doing. However tool
is working with prettier toolchain so that prettier-ruby can benefit
from the larger prettier ecosystem.

In order to work with prettier the code that will convert from AST to
ruby need to be in nodejs. So this is a nodejs project.


## Testing

- Clone this repository.
- Run `yarn`.
- Create a file called `test.rb`.
- Run `yarn prettier test.rb` to check the output.

## Guide

- [Working of parser](https://github.com/bigbinary/prettier-ruby/wiki/Working-of-parser)
- [Working of printers](https://github.com/bigbinary/prettier-ruby/wiki/Working-of-printers)


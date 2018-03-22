
## prettier-ruby

prettier-ruby is an attempt to bring prettier type features for ruby.

Please watch this video https://www.youtube.com/watch?v=hkfBvpEfWdA to 
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

TODOS:
1. I found one extra condition which we need to handle in existing written types (https://github.com/bigbinary/prettier-ruby/tree/master/src/printers) as well.
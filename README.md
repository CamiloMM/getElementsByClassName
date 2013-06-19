## This is a work in progress
As soon as it isn't, I'll remove this header.

## Why another polyfill for `getElementsByClassName`?
Because all I could find are 
[ones](https://gist.github.com/eikes/2299607) 
[that](https://gist.github.com/stereobooster/2397759) 
[do](http://stackoverflow.com/a/13327475/124119) 
[not](https://gist.github.com/jasdeepkhalsa/4117579) 
[match](http://stackoverflow.com/a/8801975/124119) 
[the spec](https://dvcs.w3.org/hg/domcore/raw-file/tip/Overview.html#dom-document-getelementsbyclassname).

Most importantly, getElementsByClassName can accept multiple class names, 
separated by spaces, and this is a feature I want to see replicated.

This code is free to use. If you can credit me, that is most welcome, but it's not mandatory.

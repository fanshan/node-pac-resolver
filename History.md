
0.0.1 / 2013-12-09
==================

  * .gitignore: ignore local dev files
  * shExpMatch: implement basic "shell expression" functionality
  * package: remove "minimatch"
  * test: add initial `shExpMatch()` function tests
  * myIpAddress: refactor to use a different "technique"
  * myIpAddress: trying to debug failing Travis-CI...
  * test: add `myIpAddress()` test
  * isInNet: properly implement the `isInNet()` function
  * dnsResolve: switch to `dns.lookup()`
  * dnsDomainLevels: fix typo
  * test: add `dnsDomainLevels()` tests
  * test: add `dnsDomainIs()` tests
  * test: add `dnsResolve()` tests
  * dnsResolve: return a "string", not an Array
  * dnsResolve: use `dns.resolve4()`
  * test: add isPlainHostName() tests
  * implement `localHostOrDomainIs()`
  * package: remove --harmony-generators flag from `npm test`
  * dnsDomainIs: add examples to jsdocs
  * shExpMatch: fix comment
  * add .travis.yml file
  * implement `dnsDomainLevels()`
  * implement `myIpAddress()`
  * add README.md
  * add initial `isInNet()` implementation
  * isPlainHostName: fix comment
  * implement `dnsResolve()`
  * test: initial test cases
  * implement `isPlainHostName()`
  * index: expose `shExpMatch` to the sandbox
  * index: pass the `url` and `host` variables into the resolver
  * shExpMatch: turn into a thunk
  * index: cache the regenerator `wrapGenerator` function
  * dnsDomainIs: turn into a thunk
  * use `degenerator` to compile the PAC proxy file
  * package: update "description"
  * package: using "mocha" for `npm test`
  * index: default the return value to "DIRECT"
  * initial commit
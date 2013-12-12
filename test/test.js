
/**
 * Module dependencies.
 */

var pac = require('../');
var assert = require('assert');

describe('FindProxyForURL', function () {

  it('should return "DIRECT" by default', function (done) {
    var FindProxyForURL = pac(
      'function FindProxyForURL (url, host) {' +
      '  /* noop */' +
      '}'
    );
    FindProxyForURL('http://foo.com/', 'foo.com', function (err, res) {
      if (err) return done(err);
      assert.equal('DIRECT', res);
      done();
    });
  });

  it('should return the value that gets returned', function (done) {
    var FindProxyForURL = pac(
      'function FindProxyForURL (url, host) {' +
      '  return { foo: "bar" };' +
      '}'
    );
    FindProxyForURL('http://foo.com/', 'foo.com', function (err, res) {
      if (err) return done(err);
      assert.deepEqual({ foo: 'bar' }, res);
      done();
    });
  });

  describe('offical docs Example #1', function () {
    var FindProxyForURL = pac(
      'function FindProxyForURL(url, host) {' +
      '  if (isPlainHostName(host) ||' +
      '      dnsDomainIs(host, ".netscape.com"))' +
      '      return "DIRECT";' +
      '  else' +
      '      return "PROXY w3proxy.netscape.com:8080; DIRECT";' +
      '}'
    );

    it('should return "DIRECT" for "localhost"', function (done) {
      FindProxyForURL('http://localhost/hello', 'localhost', function (err, res) {
        if (err) return done(err);
        assert.equal('DIRECT', res);
        done();
      });
    });

    it('should return "DIRECT" for "foo.netscape.com"', function (done) {
      FindProxyForURL('http://foo.netscape.com/', 'foo.netscape.com', function (err, res) {
        if (err) return done(err);
        assert.equal('DIRECT', res);
        done();
      });
    });

    it('should return "PROXY …" for "google.com"', function (done) {
      FindProxyForURL('http://google.com/t', 'google.com', function (err, res) {
        if (err) return done(err);
        assert.equal('PROXY w3proxy.netscape.com:8080; DIRECT', res);
        done();
      });
    });

  });

  describe('offical docs Example #1b', function () {
    var FindProxyForURL = pac(
      'function FindProxyForURL(url, host)' +
      '{' +
      '    if ((isPlainHostName(host) ||' +
      '         dnsDomainIs(host, ".netscape.com")) &&' +
      '        !localHostOrDomainIs(host, "www.netscape.com") &&' +
      '        !localHostOrDomainIs(host, "merchant.netscape.com"))' +
      '        return "DIRECT";' +
      '    else' +
      '        return "PROXY w3proxy.netscape.com:8080; DIRECT";' +
      '}'
    );

    it('should return "DIRECT" for "localhost"', function (done) {
      FindProxyForURL('http://localhost/hello', 'localhost', function (err, res) {
        if (err) return done(err);
        assert.equal('DIRECT', res);
        done();
      });
    });

    it('should return "DIRECT" for "foo.netscape.com"', function (done) {
      FindProxyForURL('http://foo.netscape.com/', 'foo.netscape.com', function (err, res) {
        if (err) return done(err);
        assert.equal('DIRECT', res);
        done();
      });
    });

    it('should return "PROXY …" for "www.netscape.com"', function (done) {
      FindProxyForURL('http://www.netscape.com/', 'www.netscape.com', function (err, res) {
        if (err) return done(err);
        assert.equal('PROXY w3proxy.netscape.com:8080; DIRECT', res);
        done();
      });
    });

    it('should return "PROXY …" for "merchant.netscape.com"', function (done) {
      FindProxyForURL('http://merchant.netscape.com/', 'merchant.netscape.com', function (err, res) {
        if (err) return done(err);
        assert.equal('PROXY w3proxy.netscape.com:8080; DIRECT', res);
        done();
      });
    });

  });

  describe('offical docs Example #5', function () {
    var FindProxyForURL = pac(
      'function FindProxyForURL(url, host)' +
      '{' +
      '    if (url.substring(0, 5) == "http:") {' +
      '        return "PROXY http-proxy.mydomain.com:8080";' +
      '    }' +
      '    else if (url.substring(0, 4) == "ftp:") {' +
      '        return "PROXY ftp-proxy.mydomain.com:8080";' +
      '    }' +
      '    else if (url.substring(0, 7) == "gopher:") {' +
      '        return "PROXY gopher-proxy.mydomain.com:8080";' +
      '    }' +
      '    else if (url.substring(0, 6) == "https:" ||' +
      '             url.substring(0, 6) == "snews:") {' +
      '        return "PROXY security-proxy.mydomain.com:8080";' +
      '    }' +
      '    else {' +
      '        return "DIRECT";' +
      '    }' +
      '}'
    );

    it('should return "DIRECT" for "foo://netscape.com"', function (done) {
      FindProxyForURL('foo://netscape.com/hello', 'netscape.com', function (err, res) {
        if (err) return done(err);
        assert.equal('DIRECT', res);
        done();
      });
    });

    it('should return "PROXY http…" for "http://netscape.com"', function (done) {
      FindProxyForURL('http://netscape.com/hello', 'netscape.com', function (err, res) {
        if (err) return done(err);
        assert.equal('PROXY http-proxy.mydomain.com:8080', res);
        done();
      });
    });

    it('should return "PROXY ftp…" for "ftp://netscape.com"', function (done) {
      FindProxyForURL('ftp://netscape.com/hello', 'netscape.com', function (err, res) {
        if (err) return done(err);
        assert.equal('PROXY ftp-proxy.mydomain.com:8080', res);
        done();
      });
    });

    it('should return "PROXY gopher…" for "gopher://netscape.com"', function (done) {
      FindProxyForURL('gopher://netscape.com/hello', 'netscape.com', function (err, res) {
        if (err) return done(err);
        assert.equal('PROXY gopher-proxy.mydomain.com:8080', res);
        done();
      });
    });

    it('should return "PROXY https…" for "https://netscape.com"', function (done) {
      FindProxyForURL('https://netscape.com/hello', 'netscape.com', function (err, res) {
        if (err) return done(err);
        assert.equal('PROXY security-proxy.mydomain.com:8080', res);
        done();
      });
    });

    it('should return "PROXY https…" for "snews://netscape.com"', function (done) {
      FindProxyForURL('snews://netscape.com/hello', 'netscape.com', function (err, res) {
        if (err) return done(err);
        assert.equal('PROXY security-proxy.mydomain.com:8080', res);
        done();
      });
    });

  });

});

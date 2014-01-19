module.exports = {
  indexHTMLDebugApp: {
    src : 'app/index.xml', dest : 'tmp/result/index.xml',
    options: { context: { dist: false, tests: false } }
  },
  indexHTMLDebugTests: {
    src : 'app/index.xml', dest : 'tmp/result/tests/index.xml',
    options: { context: { dist: false, tests: true } }
  },
  indexHTMLDistApp: {
    src : 'app/index.xml', dest : 'tmp/result/index.xml',
    options: { context: { dist: true, tests: false } }
  },
  indexHTMLDistTests: {
    src : 'app/index.xml', dest : 'tmp/result/tests/index.xml',
    options: { context: { dist: true, tests: true } }
  }
};
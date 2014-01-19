module.exports = {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    files: [{
      src: 'dist/index.xml',
      dest: 'dist/index.xml'
    }]
  }
};
module.exports = {
  app: {
    options: {
      default: {
        url: 'https://localhost:4343'
      }
    },
    files: {
      src: [
        'tmp/result/assets/**/*.css',
        'tmp/result/index.xml'
      ]
    }
  },
  dist: {
    options: {
      default: {
        url: 'https://localhost:4343'
      }
    },
    files: {
      src: [
        'dist/**/*.css',
        'dist/index.xml'
      ]
    }
  }
};

module.exports = {
  app: {
    options: {
      default: {
        url: 'https://66.108.246.148:4343'
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
        url: 'https://66.108.246.148:4343'
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

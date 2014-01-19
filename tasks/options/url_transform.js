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
        'tmp/result/index.html'
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
        'dist/index.html'
      ]
    }
  }
};

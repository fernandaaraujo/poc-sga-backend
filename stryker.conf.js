/* eslint-disable */
module.exports = function(config) {
  config.set({
    files: ['lib/*.js', 'lib/**/*.js', 'lib/**/**/*.js', 'test/**/*.js', 'test/integration/*.js', 'test/unit/**/*.js'],
    mutate: ['lib/*.js', 'lib/**/*.js', 'lib/**/**/*.js'],
    mutator: 'javascript',
    packageManager: 'npm',
    reporters: ['html'],
    testRunner: 'mocha',
    mochaOptions: {
      command: 'num run mocha',
      files: ['test/integration/*.js', 'test/unit/**/*.js'],
      asyncOnly: false
    },
    transpilers: [],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest'
  });
};

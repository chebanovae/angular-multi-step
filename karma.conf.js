// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher' ),
      require('karma-mocha-reporter'),
      require('karma-junit-reporter'),
      require('karma-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'junit', 'mocha', 'html'],
    // the default configuration
    junitReporter: {
      outputDir: 'reports/ui/unit-test', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'ui-unit-test-results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {}
    },
    htmlReporter: {
      outputDir: 'reports/ui/karma_html', // where to put the reports
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: true, // reports show failures on start
      namedFiles: false, // name files instead of creating sub-directories
      pageTitle: null, // page title for reports; browser info by default
      urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
      reportName: 'swUpdUI' // report summary filename; browser info by default
    },
    coverageIstanbulReporter: {      
      reports: [ 'html', 'lcovonly' ],
      dir: 'reports/ui/coverage', // base output directory
      'report-config': {
        html: { // any options here are valid: https://github.com/istanbuljs/istanbul-reports/blob/master/lib/html/index.js#L134-L139
        },
        lcovonly: {
          file: 'coverage.lcov' // options from here are valid: https://github.com/istanbuljs/istanbul-reports/blob/master/lib/lcovonly/index.js#L7-L10
        }        
      },
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};

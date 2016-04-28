module.exports = function(config){
  config.set({

    basePath: '../',

    files: [
      'src/**/!(run-game).js',
      'test/unit/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ]
  });
};

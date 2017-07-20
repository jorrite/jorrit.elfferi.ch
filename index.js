'use strict';

console.log(process.env.NODE_ENV);
var
  consoleLog = false,
  nodeEnv = (process.env.NODE_ENV || '').trim().toLowerCase(),
  devBuild = nodeEnv !== 'travis-default' && nodeEnv !== 'staging' && nodeEnv !== 'production',
  pkg = require('./package.json'),
  dir = {
    base: __dirname + '/',
    lib: __dirname + '/lib/',
    source: './src/',
    dest: './build/'
  },
  metalsmith = require('metalsmith'),
  layouts = require('metalsmith-layouts'),
  assets = require('metalsmith-assets'),
  webpack = require('metalsmith-webpack'),
  ignore = require('metalsmith-ignore'),
  path = require('path'),
  browsersync = devBuild ? require('metalsmith-browser-sync') : null,
  siteMeta = {
    devBuild: devBuild,
    version: pkg.version,
    nodeEnv: nodeEnv,
    title: 'Jorrit Elfferich',
    desc: 'Personal site of Jorrit Elfferich',
    author: 'Jorrit Elfferich',
    contact: 'jorrit@elfferi.ch'
  },
  templateConfig = {
    engine: 'pug',
    pretty: true
  };

var ms = metalsmith(dir.base)
  .metadata(siteMeta)
  .clean(!devBuild)
  .use(webpack({
    context: dir.source + 'js/',
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, './build/js/'),
      filename: 'bundle.js'
    }
  }))
  .use(ignore([
    'js/*'
  ]))
  .source(dir.source)
  .destination(dir.dest)
  .use(require('metalsmith-sense-sass')({
    sass: {
      outFile: path.resolve(__dirname, './build/js/style.css')
    },
    postcss: {
      plugins: {
        'autoprefixer': {}
      }
    }
  }))
  .use(layouts(templateConfig));



if (browsersync) ms.use(browsersync({ 
  server: dir.dest,
  files: [dir.source + '**/*', dir.base + 'assets/', dir.base + 'layouts'],
  serveStatic: ['./build'],
  serveStaticOptions: {
      extensions: ['html'] 
  }
}));

ms
  // .use(assets({
  //   source: dir.base + 'assets/',
  //   destination: './'
  // }))
  .build(function(err) {
    if (err) throw err;
  });

require('babel-register')({
    presets: [ 'env', 'es2015', 'stage-0' ]
});

module.exports = require('./');

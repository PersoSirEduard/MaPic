const nodemon = require('nodemon');
const path = require('path');
// npm run start:dev
nodemon({
  execMap: {
    js: 'node'
  },
  script: path.join(__dirname, 'server'),
  ignore: [],
  watch: process.env.NODE_ENV !== 'production' ? ['/*'] : false,
  ext: 'js'
})
.on('restart', function() {
  console.log('Server restarted!');
})
.once('exit', function () {
  console.log('Shutting down server');
  process.exit();
});

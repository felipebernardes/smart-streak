var gulp = require('gulp');
var beacon = require('eddystone-beacon');

gulp.task('default', function() {
  beacon.advertiseUrl('https://medium.com/@urish');
});

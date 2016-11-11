var gulp = require('gulp');
var beacon = require('eddystone-beacon');
browserSync = require('browser-sync').create();

gulp.task('default', function() {
  beacon.advertiseUrl('https://medium.com/@urish');
});

gulp.task('watch', function() {
    browserSync.init({
        server: "./"
    });
    
    gulp.watch('*.css').on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('*.js').on('change', browserSync.reload);
});

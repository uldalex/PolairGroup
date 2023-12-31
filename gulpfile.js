var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
var svgSprite = require('gulp-svg-sprite');
var cheerio = require('gulp-cheerio');


var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/app.scss',
  SCSS: './assets/scss/**/**'
};

gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task('watch', function() {
  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
});

gulp.task('open', function() {
  gulp.src('index.html')
    .pipe(open());
});
gulp.task('svg', function () {
  return gulp.src('./assets/img/template-icons/*.svg') 
  .pipe(cheerio({
    run: function ($) {
      $('[stroke]').removeAttr('stroke');
    },
    parserOptions: {xmlMode: true}
  }))
      .pipe(svgSprite({
        
              mode: {
                symbol: {
                  dest: '.symbol',
                  example: true,
                  sprite: 'symbol.svg'
                },
                stack: {
                  sprite: "../sprite.svg"  //sprite file name
              }
              },
          }
      ))
      .pipe(gulp.dest('./assets/img/'));
});

gulp.task('build', gulp.parallel('open', 'watch'));
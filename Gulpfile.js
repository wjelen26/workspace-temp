const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');

livereload({ start: true });

/*----------Local Server connect----------*/
gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

/*----------HTML----------*/
gulp.task('html', function () {
    gulp.src('./public/index.html')
        .pipe(livereload());
});


/*----------ES6----------*/
gulp.task('build', function() {
  return browserify({ entries: './js/index.js', debug: true })
    .transform("babelify", { presets: ["es2015"] })
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload());
});

/*----------CSS----------*/
gulp.task('styles', function(){
  gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'))
    .pipe(livereload());
});

/*----------WATCH----------*/
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('scss/**/*.scss', ['styles']);
  gulp.watch('./js/*.js', ['build']);
});

gulp.task('default', ['styles', 'build', 'watch', 'connect']);

// gulp.task('default', function() {
//   livereload.listen();
//   gulp.watch('scss/**/*.scss', ['styles']);
//   gulp.watch('./js/*.js', ['build']);
// });

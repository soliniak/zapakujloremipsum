'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', () => {
  return gulp.src('src/style/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/style/'));
});
 
gulp.task('img', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('pref', () => {
    gulp.src('dist/style/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/style/'))
});

gulp.task('minify-css', () => {
  return gulp.src('dist/style/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/style/styles/'));
});

gulp.task('watch', ['sass', 'browserSync', 'pref'], () => {
  gulp.watch('src/style/*.sass', ['sass']);
  gulp.watch('dist/style/*.css', ['pref']);
  gulp.watch('src/style/*.sass', browserSync.reload);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('./*.js', browserSync.reload);
});


 

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var include = require('gulp-include')



// Lint Task
gulp.task('lint', function () {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('compass', function () {
    gulp.src('./src/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './',
            sass: 'sass'
        }))
        .pipe(gulp.dest('app/assets/temp'));
});

gulp.task('script', function () {
    return gulp.src('js/brainsapp.js')
        .pipe(include())
        .on('error', console.log)
        .pipe(gulp.dest('./'));
})

// Concatenate & Minify JS
gulp.task('compress-js', function () {
    return gulp.src('./brainsapp.js')
        .pipe(rename('brainsapp.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./min'));
});

gulp.task('compress-css', function () {
    return gulp.src('./brainsapp.css')
        .pipe(cleanCSS())
        .pipe(rename('brainsapp.min.css'))
        .pipe(gulp.dest('./min'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('js/**/*.js', ['lint','script']);
    gulp.watch('sass/**/*.scss', ['compass']);
});

// Default Task
gulp.task('default', ['compass', 'watch']);

// Developent
gulp.task('fortune', ['compass', 'lint','script', 'watch']);

// Before commit
gulp.task('compress', ['compress-css', 'compress-js'])
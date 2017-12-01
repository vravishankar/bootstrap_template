const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

// Compile and Inject scss files
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/style.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

// Move javascript files to src folder
gulp.task('js', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});

// Server and watch
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './src'
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/style.scss'], ['sass']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Move Fonts to src/fonts folder
gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('src/fonts'))
});

// Move font-awesome css to src/css folder
gulp.task('fa', function() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
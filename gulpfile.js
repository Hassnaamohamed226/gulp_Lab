const { src, dest,parallel,task} = require('gulp');

const globs={
    html:"project/**/*.html",
    css:"project/css/**/*.css",
    js:"project/js/**/*.js",
    img:"project/pics/*"
}


const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const htmlMinifier = require('gulp-html-minifier-terser');
const terser = require('gulp-terser');
const optimizeImages = require('gulp-optimize-images');

task('minify-html', function () {
    return src(globs.html)
      .pipe(htmlMinifier())
      .pipe(dest('dist'));
  });
  
  // Minify JavaScript
  task('minify-js', function () {
    return src(globs.js)
      .pipe(terser())
      .pipe(gulp.dest('dist/js'));
  });
  
  // Optimize Images
  task('optimize-images', function () {
    return src(globs.img)
      .pipe(optimizeImages())
      .pipe(gulp.dest('dist/images'));
  });


// Prefix CSS
task('prefix', function () {
  return src(globs.css)
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'));
});

// Minify CSS
task('minify-css', function () {
  return src(globs.css)
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});



// Default task
task('default', parallel('prefix', 'minify-css', 'minify-html', 'minify-js', 'optimize-images'));
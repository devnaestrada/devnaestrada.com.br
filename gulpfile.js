const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const child = require('child_process')
const gutil = require('gulp-util')
const browserSync = require('browser-sync').create();

const siteRoot = '_site'
const cssFiles = '_scss/**/*.?(s)css'

const runJekyll = (props) => {
  const jekyll = child.spawn('jekyll', props)
  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll:' + message))
  }

  jekyll.stdout.on('data', jekyllLogger)
  jekyll.stderr.on('data', jekyllLogger)
}

gulp.task('jekyll:watch', () => {
  runJekyll(['build', '--watch', '--incremental', '--drafts'])
})

gulp.task('jekyll:build', () => {
  runJekyll(['build'])
})

gulp.task('css', () => {
  gulp.src(cssFiles)
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('assets/css'))
})

gulp.task('watch', () => {
  gulp.watch(cssFiles, ['css'])
})

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  })

  gulp.watch(cssFiles, ['css'])
})

gulp.task('default', ['css', 'jekyll:watch', 'serve'])
gulp.task('build', ['css', 'jekyll:build'])

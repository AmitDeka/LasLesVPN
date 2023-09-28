const gulp = require("gulp");
const gulpIf = require("gulp-if");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const htmlmin = require("gulp-htmlmin");
const cssmin = require("gulp-cssmin");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const jsImport = require("gulp-js-import");
const sourcemaps = require("gulp-sourcemaps");
const htmlPartial = require("gulp-html-partial");
const clean = require("gulp-clean");
const isProd = process.env.NODE_ENV === "prod";

const htmlFile = ["src/*.html"];

function html() {
  return gulp
    .src(htmlFile)
    .pipe(
      htmlPartial({
        basePath: "src/partials/",
      })
    )
    .pipe(
      gulpIf(
        isProd,
        htmlmin({
          collapseWhitespace: true,
        })
      )
    )
    .pipe(gulp.dest("dist"));
}

function css() {
  return gulp
    .src("src/assets/scss/global/global.scss")
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(
      sass({
        includePaths: ["node_modules"],
      }).on("error", sass.logError)
    )
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulpIf(isProd, cssmin()))
    .pipe(gulp.dest("dist/css/"));
}

function slickFont() {
  return gulp
    .src("src/assets/fonts/slick/*")
    .pipe(gulp.dest("dist/fonts/slick/"));
}
function slickGif() {
  return gulp.src("src/assets/*.gif").pipe(gulp.dest("dist/"));
}

function slickCSS() {
  return gulp
    .src("src/assets/scss/slick/*.scss")
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulpIf(isProd, cssmin()))
    .pipe(gulp.dest("dist/css/slick/"));
}

// function js() {
//   return gulp
//     .src("src/assets/js/*.js")
//     .pipe(
//       jsImport({
//         hideConsole: true,
//       })
//     )
//     .pipe(concat("all.js"))
//     .pipe(gulpIf(isProd, uglify()))
//     .pipe(gulp.dest("dist/js"));
// }
function js() {
  return gulp
    .src("src/assets/js/*.js")
    .pipe(
      jsImport({
        hideConsole: true,
      })
    )
    .pipe(gulp.dest("dist/js"));
}

function img() {
  return gulp
    .src("src/assets/images/**/*.*")
    .pipe(gulpIf(isProd, imagemin()))
    .pipe(gulp.dest("dist/images/"));
}

function serve() {
  browserSync.init({
    open: true,
    server: "./dist",
  });
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function watchFiles() {
  gulp.watch("src/**/*.html", gulp.series(html, browserSyncReload));
  gulp.watch(
    "src/assets/scss/global/*.scss",
    gulp.series(css, browserSyncReload)
  );
  gulp.watch(
    "src/assets/scss/slick/*.scss",
    gulp.series(slickCSS, browserSyncReload)
  );
  gulp.watch("src/**/*.js", gulp.series(js, browserSyncReload));
  gulp.watch("src/assets/images/*.*", gulp.series(img));

  return;
}

function del() {
  return gulp.src("dist/*", { read: false }).pipe(clean());
}

exports.html = html;
exports.js = js;
exports.css = css;
exports.slickFont = slickFont;
exports.slickGif = slickGif;
exports.slickCSS = slickCSS;
exports.del = del;
exports.serve = gulp.parallel(
  html,
  js,
  css,
  slickFont,
  slickGif,
  slickCSS,
  img,
  watchFiles,
  serve
);
// exports.serve = gulp.parallel(html, css, js, font, img, watchFiles, serve);
exports.default = gulp.series(
  del,
  html,
  js,
  css,
  slickFont,
  slickGif,
  slickCSS,
  img
);
// exports.default = gulp.series(del, html, css, js, font, img);

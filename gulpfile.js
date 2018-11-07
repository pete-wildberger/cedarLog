const gulp = require("gulp");
const sass = require("gulp-sass");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const seq = require("gulp-sequence");
const del = require("del");

gulp.task("clean", done => {
  del.sync(["dist/*"]);
  done();
});
gulp.task("dist:assets:img", () => {
  return gulp.src("src/client/assets/img/**/*").pipe(gulp.dest("dist/assets/img"));
});

gulp.task("sass", () => {
  return gulp
    .src("src/client/assets/sass/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("dist/assets/css"));
});

gulp.task("server", () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

gulp.task("dist:webpack:dev", done => {
  const { exec } = require("child_process");
  exec("webpack --config-name dev", (err, stdout, stderr) => {
    console.log("\x1b[32m", stdout);
    console.log("\x1b[41m%s\x1b[0m", stderr);
    done(err);
  });
});

gulp.task("dist:webpack:prod", done => {
  // const { execFile } = require("child_process");
  const { exec } = require("child_process");
  exec("webpack --config-name prod", (err, stdout, stderr) => {
    console.log("\x1b[34m", stdout);
    console.log("\x1b[41m%s\x1b[0m", stderr);
    done(err);
  });
});

gulp.task("build", seq(["clean", "sass", "dist:assets:img", "server"], "dist:webpack:prod"));
gulp.task("build:dev", seq(["clean", "sass", "dist:assets:img", "server"], "dist:webpack:dev"));

gulp.task("sass:watch", () => {
  gulp.watch("src/client/assets/sass/*.scss", ["sass"]);
});

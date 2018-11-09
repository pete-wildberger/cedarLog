const gulp = require("gulp");
const sass = require("gulp-sass");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const seq = require("gulp-sequence");
const del = require("del");
const { exec } = require("child_process");
const minimist = require('minimist');

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
  exec("webpack --config-name dev", (err, stdout, stderr) => {
    console.log("\x1b[32m", stdout);
    console.log("\x1b[41m%s\x1b[0m", stderr);
    done(err);
  });
});

gulp.task("dist:webpack:prod", done => {
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

gulp.task('deploy', done => {
	const opts = { cwd: 'dist/' };
	const aliases = {
    dev: 'dev',
    prod: 'prod'
	};

	const options = minimist(process.argv.slice(2), { string: 'remote' });
	if (!aliases[options.remote]) {
		return done(new Error('Invalid remote provided. Must be one of [' + Object.keys(aliases).join(', ') + '].'));
	}
	exec('git init', opts, (err, stdout, stderr) => {
		console.log(stdout);
		exec('git add .', opts, (err, stdout, stderr) => {
			exec('git commit --allow-empty -m "Deploying to ' + aliases[options.remote] + '..."', opts, (err, stdout, stderr) => {
				console.log(stdout);
				const add_remote = 'git remote add -f ' + aliases[options.remote] + ' ' + aliases[options.remote];
				exec(add_remote, opts, (err, stdout, stderr) => {
					exec('git push --force ' + aliases[options.remote] + ' master', opts, (err, stdout, stderr) => {
						console.log(stdout);
						console.log(stderr);
						done(err);
					});
				});
			});
		});
	});
});
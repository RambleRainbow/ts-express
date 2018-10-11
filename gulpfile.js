var gulp = require('gulp'),
  del = require('del'), 
  shell = require("gulp-shell"),
  tsc = require('gulp-tsc');

gulp.task("clean", () => {
  del("./dist/app");
})

gulp.task("copy", ["clean"], () => {
  gulp.src("./config")
  .dest("./dist/app/config");
})

gulp.task("tsc", ["clean"], () => {
  del("dist/**/*");
  gulp.src(["./**/*.ts", "!node_modules/*", "!dist/*"])
  .pipe(tsc({
    module: "COMMONJS",
    target: "ES2015"
  }))
  .pipe(gulp.dest("dist/"));
});

gulp.task("npm", ["clean"], () => {
  gulp.src("package*.json")
  .pipe(gulp.dest("dist/"))
  .pipe(shell(["npm install --production"], {
    cwd: "dist"
  }));
});

gulp.task("contribute", ["tsc","npm", "copy"], () => {
  
});
var gulp = require("gulp");
var concat = require('gulp-concat');
var babel = require("gulp-babel");

gulp.task('clean', function () {
    return del(['build']);
});

gulp.task("minify", function () {
    return gulp.src("src/**/*.js")
        .pipe(concat("machete.js"))
        .pipe(gulp.dest("build/js/"));
});

gulp.task("default", ["minify"], function () {});

gulp.watch('./src/*', ["minify"], function () {});

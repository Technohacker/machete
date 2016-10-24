var gulp = require("gulp");
var concat = require('gulp-concat');
var babel = require("gulp-babel");

gulp.task('clean', function () {
    return del(['build']);
});

gulp.task("minifycss", function () {
    gulp.src("src/css/*.css")
        .pipe(concat("machete.css"))
        .pipe(gulp.dest("build/css/"));
});

gulp.task("minifyjs", function () {
    return gulp.src("src/js/**/*.js")
        .pipe(concat("machete.js"))
        .pipe(gulp.dest("build/js/"));
});

gulp.task("default", ["minifycss", "minifyjs"], function () {});

gulp.watch("./src/**", ["default"]);

const gulp = require("gulp"),
    gulpShell = require("gulp-shell"),
    htmlmin = require("gulp-htmlmin"),
    rimraf = require("gulp-rimraf"),
    templateCache = require("gulp-angular-templatecache"),
    watch = require("gulp-watch"),
    runSequence = require("run-sequence"),

    escapeShellArgs = (cmd) => "'" + cmd.replace(/\'/g,"'\\''") + "'",

    clientApp = "./app/",
    
    bundleNgTemplatesConvention = (featureName) => gulp
        .src(`${clientApp}${featureName}/components/**/*.html`)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(templateCache(
            "templates.js",
            {
                module: "ng",
                root: `/app/${featureName}/components`,
                standalone: false
            }))
        .pipe(gulp.dest(`${clientApp}${featureName}/tmp/`));

gulp.task("clean", _ => gulp
    .src([
        "wwwroot/js/*.*",
        "wwwroot/css/*.*"
    ])
    .pipe(rimraf()));

gulp.task("typescript", gulpShell.task([ "tsc" ]));

gulp.task("feature1.templatecache", _ => bundleNgTemplatesConvention("feature1"));

gulp.task("feature1.template.build", [ "feature1.templatecache" ]);

// add more template build steps here...
gulp.task("template.build", [
    "feature1.template.build"   //,
    //"feature2.template.build",
    //"feature3.template.build", //...
]);

gulp.task("feature1.prod",
    [ "feature1.template.build" ],
    gulpShell.task([ "jspm bundle app/feature1 wwwroot/js/feature1.min.js --minify --inject" ]));

gulp.task("build", [ "clean" ], (callback) => {
    runSequence(
        "typescript",
        "feature1.prod",
        callback);
});

gulp.task('watch:template', _ => {
    watch([
        'app/**/*',
        '!app/**/tmp/*'
    ], function () {
        gulp.start(['template.build']);
    });
});

gulp.task("default", ["clean"], _ => gulp.start("build"));
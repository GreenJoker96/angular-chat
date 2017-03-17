var autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    env = require('node-env-file'),
    envfile = require('envfile'),
    gulp = require('gulp'),
    htmlify = require('gulp-angular-htmlify'),
    iife = require('gulp-iife'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    less = require('gulp-less'),
    ngAnnotate = require('gulp-ng-annotate'),
    nodemon = require('gulp-nodemon'),
    open = require('gulp-open'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');


var cssDeps = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/font-awesome/css/font-awesome.min.css'
];

var jsDeps = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js',
    './node_modules/socket.io-client/dist/socket.io.js'
];

var buildWatch = [
    './build/**/*.js',
    './build/**/*.css',
    './build/**/*.html'
];

var watchers = {
    javascripts: ['app/*.js', 'app/**/*.js'],
    styles: 'less/**/*.less',
    html: 'app/**/*.html',
    images: 'images/**/*.*'

};

gulp.task('env', function () {
    env(__dirname + '/.env', {overwrite: true});
});

gulp.task('templates', function () {
    gulp.src('./app/**/*.html')
        .pipe(htmlify())
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(livereload());
});

gulp.task('less', function () {
    gulp.src([
        './less/app.less'
    ])
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('js', function () {
    var baseDir = __dirname + '/app',
        outputDir = __dirname + '/build/js',
        outputFilename = 'app.js',
        env = envfile.parseFileSync('.env');

    gulp.src([
        baseDir + "/*module.js",
        baseDir + "/**/*module.js",
        baseDir + "/**/*.js"
    ])
        .pipe(iife())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat(outputFilename))
        .pipe(ngAnnotate())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputDir));
});


gulp.task('js-deps', function () {
    gulp.src(jsDeps)
        .pipe(concat('deps.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('css-deps', function () {
    gulp.src(cssDeps)
        .pipe(concat('deps.css'))
        .pipe(gulp.dest('./build/css'));

    gulp.src('./node_modules/font-awesome/fonts/*.*')
        .pipe(gulp.dest('./build/fonts'));

    gulp.src('./fonts/**/*.*')
        .pipe(gulp.dest('./build/css'));
});

gulp.task('copy-image', function () {
    gulp.src(['./images/*.*', './images/**/*.*'])
        .pipe(gulp.dest('./build/images'));
});

gulp.task('favicon', function () {
    gulp.src('./app/favicon.ico')
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch(buildWatch, function (event) {
        return gulp.src(event.path)
            .pipe(livereload());
    });

    gulp.watch(['.env'], ['env']);
    gulp.watch(watchers.javascripts, ['js']);
    gulp.watch(watchers.styles, ['less']);
    gulp.watch(watchers.html, ['templates']);
    gulp.watch(watchers.images, ['copy-img']);
});

gulp.task('serve', ['env', 'js', 'js-deps', 'css-deps', 'templates', 'less', 'copy-image', 'favicon', 'watch'], function () {
    nodemon({
        script: 'app.js',
        ext: 'js html ejs',
        ignore: ['node_modules']
    });

    livereload.listen();
});

gulp.task('default', ['serve']);
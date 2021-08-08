const {src, dest, watch, parallel, series} = require('gulp');
const sass        = require('gulp-sass');
const concat      = require('gulp-concat');
const browserSync = require("browser-sync").create();
const uglify      = require('gulp-uglify-es').default;
const prefixer    = require('gulp-autoprefixer');
const imagemin    = require('gulp-imagemin');
const del         = require('del');

const path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    audio: 'build/audio/'
  },
  src: { //Пути откуда брать исходники
    html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
    js: 'src/js/',//В стилях и скриптах нам понадобятся только main файлы
    style: 'src/styles/main.scss',
    img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    audio: 'src/audio/**/*.*'
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html:   'src/**/*.html',
    js:     'src/js/**/*.js',
    style:  'src/styles/**/*.scss',
    img:    'src/img/**/*.*',
    audio:  'src/audio/**/*.*'
  },
  clean: './build'
};

const config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 3000,
  online: true,
  logPrefix: "Frontend_Devil"
};

////////////////server////////////////////

function server() {
  browserSync.init(config);
}

////////////////////styles//////////////////////

function styles(){
  return src(path.src.style)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(prefixer({
      overrideBrowserList : ['last 2 version'],
      grid: true
    }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream())
}

////////////////////html//////////////////////

function html(){
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream())
}


////////////////////js//////////////////////

function js(){
  return src([
    path.src.js + 'sectors/slider.js',
    path.src.js + 'sectors/calc.js',
    path.src.js + 'sectors/timing.js',
    path.src.js + 'sectors/maze.js',
    path.src.js + 'sectors/weather.js',
    path.src.js + 'index.js'
  ])
    .pipe(concat('index.min.js'))
    //.pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream())
}

////////////////////img//////////////////////

function images(){
  return src(path.src.img)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream())


}

//////////////////////////audio//////////////////////////////

function audio() {
  return src(path.src.audio)
    .pipe(dest(path.build.audio));
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////

function clean() {
  return del('build');
}

function watching(){
  watch(path.watch.style,styles);
  watch(path.watch.html,html).on('change',browserSync.reload);
  watch(path.watch.js,js);
  watch(path.watch.img,images);
}

exports.styles      = styles;
exports.html        = html;
exports.images      = images;
exports.audio       = audio;
exports.js          = js;
exports.clean       = clean;
exports.watching    = watching;
exports.server      = server;


exports.build = series(clean,images,audio,styles,js,html);
exports.default = parallel(server,watching);
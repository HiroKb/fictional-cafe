// プラグインの読み込み
const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const postCss = require("gulp-postcss");
const autoPrefixer = require("autoprefixer");
const browserSync = require("browser-sync");


/**
 * Sassをコンパイルするタスク
 */
function compileSass () {
    // style.scssファイルを取得
    return src("scss/style.scss")
        //globの有効化
        .pipe(sassGlob())
        // Sassのコンパイルを実行
        .pipe(
            // コンパイル後のCSSを展開
            sass({
                outputStyle: "expanded"
            })
        )
        //プレフィックス自動化
        .pipe(postCss([
            autoPrefixer()
        ]))
        // cssフォルダー以下に保存
        .pipe(dest("css"));
}
/**
 * Sassファイルを監視し、変更があったらSassを変換します
 */

function browsersync() {//browsersync（ブラウザリロード）のサーバ立ち上げ
    return browserSync.init({
        server:{
            baseDir: "./", //対象ディレクトリ
            index: "index.html" //対象ファイル
        },
        reloadOnRestart: true
    });
}
function bsReload(cd) {//ブラウザのリロード
    browserSync.reload();
    cd();
}
function start() {
    browsersync();
    compileSass();
    watch("scss/**/*.scss", compileSass);
    watch('./*.html', bsReload);
    watch('./css/*.css', bsReload);
    watch('./js/*.js', bsReload);
}

// npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにする
exports.default = start;

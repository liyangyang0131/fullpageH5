// 引入 gulp及组件
var gulp=require('gulp'),  //gulp基础库
    minifyCss=require('gulp-minify-css'),   //css压缩
    concat=require('gulp-concat'),   //合并文件
    uglify=require('gulp-uglify'),   //js压缩
    rename=require('gulp-rename'),   //文件重命名
    // jshint=require('gulp-jshint'),   //js检查
    notify=require('gulp-notify'),   //提示
    minifyHtml =  require('gulp-minify-html'),
    img = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),    //对文件名加MD5后缀
    revCollector = require('gulp-rev-collector')    //路径替换 gulp-rev-collector: 根据rev生成的manifest.json文件中的映射, 去替换文件名称, 也可以替换路径

//css处理
gulp.task('minifycss',function(){
   return gulp.src('./css/*.css')      //设置css
    //    .pipe(concat('index.css'))      //合并css文件到"order_query"
    //    .pipe(gulp.dest('dist/css'))           //设置输出路径
    //    .pipe(rename({suffix:'.min'}))         //修改文件名
       .pipe(minifyCss())                    //压缩文件
       .pipe(rev())                           //添加hash后缀
       .pipe(gulp.dest('dist/css'))            //输出文件目录
       .pipe(rev.manifest())                 //生成文件映射 json文件
       .pipe( gulp.dest( 'rev/css' ) )       //将映射文件导出到rev/css
       .pipe(notify({message:'css task ok'}));   //提示成功
});

//JS处理
gulp.task('libminifyjs',function(){
    return gulp.src(['./lib/*.js'])  //选择合并的JS
        // .pipe(rename({suffix:'.min'}))     //重命名
        .pipe(uglify())                    //压缩
        .pipe(gulp.dest('dist/lib'))            //输出
        .pipe(notify({message:"libjs task ok"}));    //提示
 });

gulp.task('minifyjs',function(){
   return gulp.src(['./js/*.js'])  //选择合并的JS
    //    .pipe(concat('order_query.js'))   //合并js
    //    .pipe(gulp.dest('dist/js'))         //输出
    //    .pipe(rename({suffix:'.min'}))     //重命名
       .pipe(uglify())                    //压缩
       .pipe(rev())                        //添加hash后缀
       .pipe(gulp.dest('dist/js'))            //输出
       .pipe(rev.manifest())                 //生成文件映射
       .pipe( gulp.dest( 'rev/js' ) )        //将映射文件导出到rev/js
       .pipe(notify({message:"js task ok"}));    //提示
});

// 压缩image
gulp.task('minifyimg', function() {
    return gulp.src('./images/*.{jpg,png,gif}')
        .pipe(img())
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({message:'img task ok'}));    //提示成功
});

//压缩html
// gulp.task('minifyhtml',function() {
//     return gulp.src(['./*.html'])
//         .pipe(minifyHtml(options))    //压缩
//         .pipe(gulp.dest('dist'))    //输出
//         .pipe(notify({message:'html task ok'}));    //提示成功
// });

gulp.task('rev', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        minfyJS: true,//压缩页面JS
        minfyCss: true,//压缩页面CSS
    };
    return gulp.src(['./rev/**/*.json', './*.html'])
        .pipe(revCollector({
            replaceReved:true,
            revSuffix:'-[0-9a-f]{8,10}-?'    //默认
        }))
        .pipe( minifyHtml(options) )
        .pipe( gulp.dest('dist') )
        .pipe(notify({message:'html task ok'}));    //提示成功
});

gulp.task('copy',  function() {
    return gulp.src('./audio/*')
      .pipe(gulp.dest('dist/audio'))
      .pipe(notify({message:'copy task ok'}));    //提示成功
  });

//执行压缩前，先删除以前压缩的文件
gulp.task('clean', function() {
    return gulp.src(['dist/*', 'rev/*'])
        .pipe(clean());
});

// 'clean',
gulp.task('default',gulp.series('clean','minifycss','libminifyjs','minifyjs','minifyimg','rev','copy',function(){
    
}))
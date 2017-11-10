'use strict'

/*
* 1.LESS编译 压缩 合并
* 2.js合并 压缩 混淆
* 3.img的复制
* 4.html压缩
* */
//先载入gulp包
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
//注册任务
//1.LESS编译 压缩 合并
gulp.task('style',function(){
    /*执行style时自动执行*/
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({
            stream: true
        }));

});
//2.js合并 压缩 混淆
gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(reload({
            stream:true
        }));
})
//3.img的复制
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({
            stream:true
        }));
})
//4.html压缩
var htmlmin = require('gulp-htmlmin');
gulp.task('htmls',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream:true
        }));
});
/*var htmlmin = require('gulp-htmlmin');

gulp.task('minify', function() {
    return gulp.src('src/!*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});*/


gulp.task('serve',function(){
    browserSync({
        server: {
            baseDir:['dist']//设置根目录
        }
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/script/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['htmls']);
})

// const gulp=require('gulp')

// const sass=require('gulp-sass')
// const cssnano=require('gulp-cssnano')
// const rev=require('gulp-rev')
import * as dartSass from 'sass'
import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import cssnano from 'gulp-cssnano'
import rev from 'gulp-rev'
import imagemin from 'gulp-imagemin'
//import { default } from 'gulp-uglify-es';
// let uglify = require('gulp-uglify-es').default;
import * as del from 'del'
const sass=gulpSass(dartSass)

gulp.task('css', function(done){
    console.log('minifying css...')

    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'))

    gulp.src('./assets/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'))
    
    done()
})

gulp.task('js', function(done){
    console.log('minifying js...')

    gulp.src('./assets/**/*.js')
        //.pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'))
    
    done()
})

gulp.task('images', function(done){
    console.log('minifying images...')

    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'))
    
    done()
})

gulp.task('clean:assets', function(done){
    del.deleteSync('./public/assets')
    done()
})

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets...')
    done()
})
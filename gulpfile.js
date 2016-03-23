var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var del = require('del');
var sass = require('gulp-sass');

//compile TypeScript files using globs
gulp.task('tscompile:globs', function() {
  var tsResult = gulp.src(['app/**/*.ts', 'app/shared/**/*.ts'])
    .pipe(ts({
        target: "ES5",
        module: "system",
        moduleResolution: "node",
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        removeComments: false,
        noImplicitAny: false,
        //all above are settings recommended by Angular   
        declaration: true, //if false then the dts pipe will be ignored
        noExternalResolve: true,
        out: "app.js"       
      }));
 
  return merge([
    tsResult.dts.pipe(gulp.dest('typings')),
    tsResult.js.pipe(gulp.dest(''))
    ]);
});

//compile TypeScript using tsconfig.json file, assumption: outFile specified

gulp.task("tscompile:tsconfig-single", function(){    
   var tsProject = ts.createProject('tsconfig.json', {outFile: "app.js"});     
   var tsResult = tsProject.src()
   .pipe(ts(tsProject));
  
return merge([   
   tsResult.js.pipe(gulp.dest('wwwroot/js')), //good for single js file 
   tsResult.dts.pipe(gulp.dest('typings'))
   ],
   gulp.src(['app/**/*', '!app/**/*.ts']).pipe(gulp.dest('wwwroot/app')) //copies other stuff, specifically .html and .css files used by components
);
});

//compile TypeScript using tsconfig.json file, assumption: outFile NOT specified
gulp.task("core:tscompile:tsconfig-multi", function(){
   var tsProject = ts.createProject('tsconfig.json');  
   var tsResult = tsProject.src()
   .pipe(ts(tsProject));
 
return merge([
   tsResult.js.pipe(gulp.dest('')), //good for multiple js files - will replicate app folder structure
   tsResult.dts.pipe(gulp.dest('typings'))
]);
});

//
gulp.task("after:tscompile:multi", function(){
 return gulp.src(['app/**/*', '!app/**/*.ts']).pipe(gulp.dest('wwwroot/app'));   
});

gulp.task("tscompile:tsconfig-multi", ["core:tscompile:tsconfig-multi" , "after:tscompile:multi" ]);


//deletes ts originating files
gulp.task("del:tsoutput", function(){
    return del([
        "app/**/*.js", //for multi
        "wwwroot/app", //for multi
        "typings/app",
        "typings/app.d.ts", //for single
        "js/app.js",    //for single
        "app.js"       //for fuckup
    ]);
});


/***************
SASS
****************/
gulp.task('bootstrap_scss:compile', function () {
    return gulp.src('./assets/sass/app.scss')
    .pipe(sass({        
        includePaths: ['./bower_components/bootstrap-sass/assets/stylesheet'],
    }))
    .pipe(gulp.dest('./wwwroot/css/'));
});

gulp.task('bootstrap_fonts:copy', function () {
    return gulp.src('bower_components/bootstrap-sass/assets/fonts/**/*')
    .pipe(gulp.dest('wwwroot/fonts'));
});

/***************
COPY ONCE - one time copy of various assets from node_modules, bower_components etc, run it from cmd, not defined in tasks.json
****************/
gulp.task("copy:once", function() {
  return merge(
    gulp.src('bower_components/bootstrap-sass/assets/fonts/**/*').pipe(gulp.dest('wwwroot/fonts')),
    gulp.src([
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery/dist/jquery.slim.js',
        'bower_components/jquery/dist/jquery.slim.min.js',
        "node_modules/es6-shim/es6-shim.min.js",
        "node_modules/systemjs/dist/system-polyfills.js",
        "node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",
        "node_modules/angular2/bundles/angular2-polyfills.js",
        "node_modules/systemjs/dist/system.src.js",
        "node_modules/rxjs/bundles/Rx.js",
        "node_modules/angular2/bundles/angular2.dev.js",
        "node_modules/angular2/bundles/router.dev.js"])
        .pipe(gulp.dest('wwwroot/lib'))        
    );
});


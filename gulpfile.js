const rollup = require('rollup');
const { series, parallel, task, src, dest } = require('gulp');
const less = require("gulp-less");
const cssnano = require('gulp-cssnano')
const cssmin = require('gulp-minify-css');
const rename = require('gulp-rename')
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const path = require('path')
const fs = require('fs')
const buildBaseBath = path.resolve(__dirname, 'dist/es')
const mode = 'esm'

const commonPlugins = [
    babel({
        exclude: ["node_modules/**"],
        runtimeHelpers: true
    }),
    resolve(),
    commonjs({
        include: ["node_modules/**"]
    })
]


async function createRollupFn(inputOptions, outputOptions) {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}


function createLessBuildFn(filename, outputName) {
    src(filename)
        //进行预编译处理,保持与引入的模块一致
        .pipe(less())
        .pipe(cssnano()) //如果使用cssnano需要在autoprefix之前调用，否则后者无效
        .pipe(postcss([ autoprefixer() ]))
        .pipe(cssmin())
        .pipe(rename({ //重命名为style.min.css
            suffix: '.min'
        }))
        //编译后将less编译成的css文件保存到项目目录下的css文件夹中
        .pipe(dest(path.resolve(buildBaseBath, outputName)))
}

function createCssBuildFn(filename, outputName) {
    src(filename)
        .pipe(cssnano()) //如果使用cssnano需要在autoprefix之前调用，否则后者无效
        .pipe(postcss([ autoprefixer() ]))
        .pipe(cssmin())
        .pipe(rename({ //重命名为style.min.css
            suffix: '.min'
        }))
        //编译后将less编译成的css文件保存到项目目录下的css文件夹中
        .pipe(dest(path.resolve(buildBaseBath, outputName)))
}

function buildFn() {
    const arrJs = []
    const arrCss = []
    const arrLess = []
    const _paths = path.resolve(__dirname, 'src/components')
    function next(fullPath, basePath) {
        const inputOptions = {
            input: fullPath,
            external: ["react"],
            plugins: [...commonPlugins]
        }
        const outputOptions = {
            file: path.resolve(buildBaseBath, basePath),
            format: mode
        }
        try {
            fs.accessSync(fullPath)
            const statObj = fs.statSync(fullPath)
            if (statObj.isDirectory()) {
                const dirs = fs.readdirSync(fullPath);
                dirs.forEach(dir => {
                    next(path.resolve(fullPath, dir), path.join(basePath, dir))
                });
            } else {
                const extName = path.extname(fullPath);
                if (/less/.test(extName)) {
                    const index = arrLess.length ? arrLess.length + 1 : 1;
                    const statObj = fs.statSync(fullPath)
                    arrLess.push(async function (cb) {
                        const newArr = basePath.split('\\')
                        newArr.splice(newArr.length -1 ,1)
                        console.log(`正在打包第${index}个css文件`)
                        console.log(`文件：${fullPath}`)
                        console.log(`大小：${statObj.size}B`)
                        createLessBuildFn(fullPath, newArr.join('/'))
                        console.log(`第${index}个less文件，打包成功`)
                        cb()
                    })
                } if (/css/.test(extName)) {
                    const index = arrCss.length ? arrCss.length + 1 : 1;
                    const statObj = fs.statSync(fullPath)
                    arrCss.push(async function (cb) {
                        const newArr = basePath.split('\\')
                        newArr.splice(newArr.length -1 ,1)
                        console.log(`正在打包第${index}个css文件`)
                        console.log(`文件：${fullPath}`)
                        console.log(`大小：${statObj.size}B`)
                        createCssBuildFn(fullPath, newArr.join('/'))
                        console.log(`第${index}个css文件，打包成功`)
                        cb()
                    })
                } else if (/js/.test(extName)) {
                    const index = arrJs.length ? arrJs.length + 1 : 1;
                    const statObj = fs.statSync(fullPath)
                    arrJs.push(async function (cb) {
                        console.log(`正在打包第${index}个js文件`)
                        console.log(`文件：${fullPath}`)
                        console.log(`大小：${statObj.size}B`)
                        await createRollupFn(inputOptions, outputOptions)
                        console.log(`第${index}个js文件，打包成功`)
                        cb()
                    })
                }
            }
        } catch (error) {
            throw error;
        }
    }

    next(_paths, '');

    return {
        js: arrJs,
        css: arrCss,
        less: arrLess
    };
}
const buildArr = buildFn()

task('buildJs', series(...buildArr.js))
task('buildCss', series(...buildArr.css))
task('buildLess', series(...buildArr.less))

exports.default = parallel('buildCss', 'buildLess')
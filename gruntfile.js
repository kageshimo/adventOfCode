module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "./src",
                        src: ["**.txt"],
                        dest: "./dist/scripts"
                    },
                    {
                        expand: true,
                        cwd: "./static",
                        src: ["**"],
                        dest: "./dist/static"
                    },
                    {
                        expand: true,
                        cwd: "./views",
                        src: ["**"],
                        dest: "./dist/views"
                    }
                ]
            }
        },
        ts: {
            app: {
                files: [{
                    src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
                    dest: "./dist"
                }],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: false,
                    rootDir: "src"
                }
            }
        },
        watch: {
            ts: {
                files: ["src/\*\*/\*.ts"],
                tasks: ["ts"]
            },
            public: {
                files: ["src/**/*"],
                tasks: ["copy"]
              },
            views: {
                files: ["views/**/*.pug"],
                tasks: ["copy"]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", [
        "copy",
        "ts"
    ]);
};
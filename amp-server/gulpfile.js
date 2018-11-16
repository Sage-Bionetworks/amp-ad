const gulp = require("gulp")
const babel = require("gulp-babel")
 
gulp.task("default", () =>
  gulp.src([
    "src/queryForData.js",
    "src/index.js"
  ])
    .pipe(babel({
      presets: ["env"]
    }))
    .pipe(gulp.dest("dist"))
)

gulp.task("synapse", () => {
  gulp.src([
    "src/synapse/HTTPError.js",
    "src/synapse/SynapseClient.js",
    "src/synapse/SynapseConstants.js"
  ])
    .pipe(babel({
      presets: ["env"]
    }))
    .pipe(gulp.dest("dist/synapse"))
})


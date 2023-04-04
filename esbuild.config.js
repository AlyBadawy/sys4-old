const railsEnv = process.env.RAILS_ENV || 'development';
const optimize = railsEnv !== 'development';
const errorFilePath = `esbuild_error_${railsEnv}.txt`;

const watch = process.argv.includes('--watch');

const path = require('path');
const fs = require('fs');

const { default: importGlob } = require('esbuild-plugin-import-glob');
const { sassPlugin } = require('esbuild-sass-plugin');

function handleError(error) {
  if (error) fs.writeFileSync(errorFilePath, error.toString());
  else if (fs.existsSync(errorFilePath))
    fs.truncate(errorFilePath, 0, () => {});
}

require('esbuild').build({
  absWorkingDir: path.join(process.cwd(), 'app/javascript'),
  bundle: true,
  color: true,
  entryPoints: ['application.ts'],
  external: ['*.ttf'],
  loader: {
    '.png': 'file',
    '.svg': 'file',
  },
  minify: optimize,
  outdir: path.join(process.cwd(), 'app/assets/builds'),
  plugins: [importGlob(), sassPlugin({ cache: true })],
  sourcemap: true,
  watch: watch && { onRebuild: handleError },
});

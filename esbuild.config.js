const railsEnv = process.env.RAILS_ENV || 'development';
const errorFilePath = `esbuild_error_${railsEnv}.txt`;

const isProduction = ['production', 'staging'].includes(railsEnv);

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
  entryPoints: ['react.tsx'],
  external: ['*.ttf'],
  loader: {
    '.jpeg': 'file',
    '.jpg': 'file',
    '.json': 'json',
    '.locale.json': 'file',
    '.png': 'file',
    '.svg': 'file',
  },
  minify: isProduction,
  outdir: path.join(process.cwd(), 'app/assets/builds'),
  plugins: [importGlob(), sassPlugin({ cache: true })],
  sourcemap: !isProduction,
  watch: watch && { onRebuild: handleError },
  incremental: watch,
  tsconfig: '../../tsconfig.json',
  format: 'esm',
  splitting: true,
  inject: ['./react-shim.ts'],
  mainFields: ['module', 'main', 'browser'],
});

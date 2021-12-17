import minimist from 'minimist';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import json from '@rollup/plugin-json';

import baseConfig from './rollup.config.base';

const argv = minimist(process.argv.slice(2));

const external = ['vue'];

const buildFormats = [];

// ES file build config
// Currently we only support es build
if (!argv.format || argv.format === 'es') {
  const merged = {
    input: 'src/polaris-vue.ts',
    external,
    output: {
      file: 'dist/polaris-vue.min.js',
      format: 'esm',
      exports: 'named',
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      json(),
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      typescript({
        typescript: ttypescript,
        useTsconfigDeclarationDir: true,
        emitDeclarationOnly: true,
      }),
      babel({
        ...baseConfig.plugins.babel,
        presets: [['@babel/preset-env']],
      }),
      terser(),
    ],
  };

  buildFormats.push(merged);
}

// Export config
export default buildFormats;

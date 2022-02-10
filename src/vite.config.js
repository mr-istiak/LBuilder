import path from 'path'
import { writeFile } from 'fs'
import { promisify } from 'util';

const WriteFile = promisify(writeFile);

export default async function(options) {
    if (options.bundlerName !== 'Vite') return;
    await WriteFile(path.resolve(options.PACKAGE_PATH, 'vite.config.js'), 
`import path from 'path';
import { defineConfig } from 'vite';
${ options.jsFremwork === 'VueJs' ? 'import vue from \'@vitejs/plugin-vue\';' : '' }

export default defineConfig({
    base: '/build/',
    publicDir: 'fake_diractory',
    build: {
        outDir: 'public/build',
        assetsDir: '.',
        rollupOptions: {
            input: [
                'resources/js/app.js',
                'resources/css/app.css'
            ]
        }
    },
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
        },
    },
    ${ options.jsFremwork === 'VueJs' ? 'plugins: [vue()]' : '' }
})`, { encoding: 'utf-8' })
}
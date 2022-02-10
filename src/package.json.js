import path from "path";
import { promisify } from "util";
import { readFile, writeFile } from "fs";

const ReadFile = promisify(readFile);
const WriteFile = promisify(writeFile);

export default async function resolvePackageJSON(options) {
    if (options.bundlerName === 'Webpack') return;
    let packageJson = await ReadFile(path.resolve(options.PACKAGE_PATH, 'package.json'), { encoding: 'utf-8' });
    packageJson = JSON.parse(packageJson);
    packageJson.scripts = options.bundlerName === 'Vite' ? {
        dev: 'vite',
        production: 'vite build'
    } : packageJson.scripts;

    packageJson.devDependencies = {
        "autoprefixer": "^10.1.0",
        "postcss-import": "^14.0.2"
    }
    if ( options.bundlerName === 'Vite' ) {
        packageJson.devDependencies['vite'] = '^2.7.3'
        if ( options.jsFremwork === 'VueJs' ) {
            packageJson.devDependencies['@vitejs/plugin-vue'] = '^2.0.1'
        }
    }
    if ( options.cssFremwork === 'TailwindCss' ) {
        if ( options.laravelStarterPack === 'Brezze' ) {
            packageJson.devDependencies['@tailwindcss/forms'] = '^0.4.0'
        }
        packageJson.devDependencies['tailwindcss'] = '^3.0.0'
    }
    packageJson.dependencies = {
        "axios": "^0.21",
        "lodash": "^4.17.19",
    }
    if ( options.jsFremwork === 'AlpineJs' ) {
        packageJson.dependencies['alpinejs'] = '^3.4.2'
    }
    if ( options.jsFremwork === 'VueJs' ) {
        packageJson.dependencies['vue'] = '^3.2.26'
        packageJson.devDependencies['@inertiajs/inertia'] = '^0.10.0',
        packageJson.devDependencies['@inertiajs/inertia-vue3'] = '^0.5.1'
        packageJson.devDependencies['@inertiajs/progress'] = '^0.2.6'
        delete packageJson.dependencies['axios'];
    }
    packageJson = JSON.stringify(packageJson, '','    ' )
    await WriteFile(path.resolve(options.PACKAGE_PATH, 'package.json'), packageJson, { encoding: 'utf-8' })
}
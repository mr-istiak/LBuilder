import Listr from 'listr'
import includeAssets from './assets'
import { runScripts } from './scripts'
import { projectInstall } from 'pkg-install'

export default async function build(options) {
    options.PACKAGE_PATH = process.cwd()+'/'+options.templateName
    let tasks = new Listr([{
        title: 'Downloading Laravel and other Packages',
        task: () => runScripts(options)
    },{
        title: 'Resloving all files',
        task: () => includeAssets(options)
    },{
        title: 'Installing NPM Packages',
        task: () => projectInstall({ cwd: options.PACKAGE_PATH })
    }])
    await tasks.run()
}
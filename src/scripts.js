import scripy from "scripy"

export async function runScript(script) {
    return new Promise((resolve, reject) => {
        let command = scripy(script);
        command.on('close', () => {
            if ( command.exitCode === 0 ) {
                resolve(command);
            }
            reject(false)
        });
        command.on('error', () => {
            reject(false)
        })
    })
}

export async function runScripts(options) {
    let laravel = await runScript(`composer create-project laravel/laravel${!options.templateName ? '' : ' '+options.templateName}`)    
    if (!laravel) return;
    
    let downloadBrezze = await runScript(`composer require laravel/breeze --dev --working-dir=${process.cwd()+'/'+options.templateName}`);
    if (!downloadBrezze) return;

    if ( options.jsFremwork === 'VueJs' ) {
        await runScript(`php ${options.templateName}/artisan breeze:install vue`);
    }
    if ( options.jsFremwork === 'ReactJs' ) {
        await runScript(`php ${options.templateName}/artisan breeze:install react`);
    }
    if ( options.jsFremwork === 'AlpineJs' ) {
        await runScript(`php ${options.templateName}/artisan breeze:install`);
    }
}

export default { runScript, runScripts }
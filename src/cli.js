import arg from "arg";
import inquirer from "inquirer";
import build from './build'

function getArguments(rawArgs) {
    let args = arg({}, {
        argv: rawArgs.slice(2)
    })
    return {
        templateName: args['_'][0] || null,
        laravelStarterPack: args['_'][1] || false,
        jsFremwork: args['_'][2] || false,
        cssFremwork: args['_'][3] || false,
        bundlerName: args['_'][4] || false
    }
}

async function propmtQuasean(options) {
    let newOptions = options
    if (options.laravelStarterPack) {
        let laravelPacks = ['Brezze', 'JetStream', 'Fortify', 'Nothing']
        let falsed = [];
        laravelPacks.forEach(value => {
            if ( newOptions.laravelStarterPack == value ) return;
            falsed.push(value);
        })
        if ( falsed.length > 3 ) {
            console.error(`Error| Invaild Laravel Starter Pack Name`)
            return false;
        }
    }
    if (! options.laravelStarterPack) {
        newOptions.laravelStarterPack = (await inquirer.prompt([{
            type: 'list',
            name: 'laravelStarterPack',
            message: 'Please choose somthing of Laravel or skip.',
            choices: ['Brezze', 'JetStream', 'Fortify', 'Nothing'],
            default: 'Brezze'
        }]))['laravelStarterPack']
    }
    if (options.jsFremwork) {
        let falsed = [];
        if ( newOptions.laravelStarterPack == 'Brezze' ) {
            ['VueJs', 'ReactJs', 'AlpineJs'].forEach(value => {
                if ( newOptions.jsFremwork == value ) return;
                falsed.push(value);
            })
            if ( falsed.length > 2 ) {
                console.error(`Error| Invaild Js Fremwork Name Or your previous section doesn't compatable with this fremworke.`)
                return false;
            }
        } else if ( newOptions.laravelStarterPack == 'JetStream' ) {
            ['VueJs', 'AlpineJs'].forEach(value => {
                if ( newOptions.jsFremwork == value ) return;
                falsed.push(value);
            })
            if ( falsed.length > 1 ) {
                console.error(`Error| Invaild Js Fremwork Name Or your previous section doesn't compatable with this fremworke.`)
                return false;
            }
        } else {
            ['Vanila', 'VueJs', 'ReactJs', 'AngularJs', 'AlpineJs'].forEach(value => {
                if ( newOptions.jsFremwork == value ) return;
                falsed.push(value);
            })

            if ( falsed.length > 4 ) {
                console.error(`Error| Invaild Js Fremwork Name Or your previous section doesn't compatable with this fremworke.`)
                return false;
            }
        }
    }
    if(! options.jsFremwork ) {
        newOptions.jsFremwork = (await inquirer.prompt([{
            type: 'list',
            name: 'jsFremwork',
            message: 'Please choose a js fremwork for your project.',
            choices: newOptions.laravelStarterPack == 'Brezze' ? 
            ['VueJs', 'ReactJs', 'AlpineJs'] : (newOptions.laravelStarterPack == 'JetStream' ? 
            ['VueJs', 'AlpineJs'] : ['Vanila', 'VueJs', 'ReactJs', 'AngularJs', 'AlpineJs']),
            default: 'VueJs'
        }]))['jsFremwork']
    }
    if (options.cssFremwork) {
        let falsed = [];
        if ( newOptions.laravelStarterPack == 'Brezze' || newOptions.laravelStarterPack == 'JetStream' ) {
            ['TailwindCss'].forEach(value => {
                if ( newOptions.cssFremwork == value ) return;
                falsed.push(value);
            })
            if ( falsed.length > 0 ) {
                console.error(`Error| Invaild Js Fremwork Name Or your previous section doesn't compatable with this fremworke.`)
                return false;
            }
        } else {
            ['Vanila', 'TailwindCss', 'Bootstrap'].forEach(value => {
                if ( newOptions.cssFremwork == value ) return;
                falsed.push(value);
            })
            if ( falsed.length > 2 ) {
                console.error(`Error| Invaild Js Fremwork Name Or your previous section doesn't compatable with this fremworke.`)
                return false;
            }
        }
    }
    if (! options.cssFremwork) {
        newOptions.cssFremwork = (await inquirer.prompt([{
            type: 'list',
            name: 'cssFremwork',
            message: 'Please choose a css fremwork for your project.',
            choices: newOptions.laravelStarterPack == 'Brezze' ? 
                ['TailwindCss'] : ( newOptions.laravelStarterPack == 'JetStream' ? 
                ['TailwindCss'] : ['Vanila', 'TailwindCss', 'Bootstrap']),
            default: 'TailwindCss'
        }]))['cssFremwork']
    }
    if (newOptions.bundlerName) {
        let falsed = [];
        ['Vite', 'Webpack', 'Rollup', 'Gulp'].forEach(value => {
            if ( newOptions.bundlerName == value ) return;
            falsed.push(value);
        })
        if ( falsed.length > 3 ) {
            console.error(`Error| Invaild Bundler Name`)
            return false;
        }
    }
    if (! newOptions.bundlerName ) {
        newOptions.bundlerName = (await inquirer.prompt([{
            type: 'list',
            name: 'bundlerName',
            message: 'Please choose a bundler for your js and css.',
            choices: ['Vite', 'Webpack', 'Rollup', 'Gulp'],
            default: 'Vite'
        }]))['bundlerName']
    }
    return newOptions;
}

export async function cli(args) {
    let options = getArguments(args);
    options = await propmtQuasean(options)
    if (!options) return;
    build(options)
}
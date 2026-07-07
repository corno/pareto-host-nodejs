import * as p_ from 'pareto-core/implementation/refiner'

import { type main } from './signatures.js'

export * from './signatures.js'


/**
 * Runs a program main function, passing command line arguments (excluding
 * `node` and the script name), and setting the process exit code to the
 * returned value when the async value completes.
 */
export const run_main_command: main = (
    get_main
) => {
    get_main().execute(
        {
            'arguments': p_.literal.list(process.argv.slice(2))
        },
        ($) => $,
    ).__start(
        () => {
        },
        ($) => {
            process.exitCode = $['exit code']
        }
    )
}
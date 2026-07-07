import * as p_ from 'pareto-core/implementation/command'
import * as p_ci from 'pareto-core/interface/command'

/**
 * Runs a program main function, passing command line arguments (excluding
 * `node` and the script name), and setting the process exit code to the
 * returned value when the async value completes.
 */


import * as d_main from "pareto-application-api/interface/data/main"


export const run_main_command = (
    get_main: () => p_ci.Command<d_main.Error, d_main.Parameters>,
): undefined => {
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
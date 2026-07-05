import * as p_ from 'pareto-core/dist/implementation/refiner'

import { type main } from './signatures'

export * from './signatures'



import { $ as r_execute_unrestricted } from "./execute_unrestricted/resources"
// import { $ as r_execute_sandboxed } from "./execute_sandboxed/resources"
import { $ as r_stream } from "./stream/resources"
import { $ as r_filesystem_unrestricted } from "./file_system_unrestricted/resources"
//import { $ as r_filesystem_sandboxed } from "./file_system_sandboxed/resources" --- IGNORE ---

/**
 * Runs a program main function, passing command line arguments (excluding
 * `node` and the script name), and setting the process exit code to the
 * returned value when the async value completes.
 */
export const run_main_command: main = (
    get_main
) => {
    get_main({
        'execute unrestricted': r_execute_unrestricted,
        // 'execute sandboxed': r_execute_sandboxed,
        'stream': r_stream,
        'filesystem unrestricted': r_filesystem_unrestricted,
        //'filesystem sandboxed': r_filesystem_sandboxed,
    }).execute(
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
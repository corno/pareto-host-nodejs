import * as _pc from 'pareto-core/dist/command'

import * as _p from 'pareto-core/dist/assign'

import { __command } from 'pareto-core/dist/__internals/async/command'
import { __command_promise } from 'pareto-core/dist/__internals/async/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { spawn } from "node:child_process"
import { Message } from '../terminal_output'
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/path/text"

// import { Signature } from "pareto-resources/dist/interface/algorithms/commands/execute_smelly_procedure_executable"


/**
 * 
 * The executable being executed is assumed to only cause side effects
 * and not return any meaningful data, std::out is therefor ignored
 */
export const $$: resources.commands.execute_any_smelly_command_executable = __command((
    $p,
) => {
    const args = $p.args.__get_raw_copy()
    return __command_promise({
        'execute': (on_success, on_error) => {

            const child = spawn($p.program, args, {
                'cwd': $p['working directory'].__decide(
                    ($) => t_path_to_text.Context_Path($),
                    () => undefined,
                ),
                shell: false, // direct execution, no shell
                stdio: ['pipe', 'pipe', 'pipe'], // explicitly pipe stdin, stdout, stderr
            })

            let stderrData = ""

            let stdoutData = ""

            child.stdout.on("data", chunk => {
                stdoutData += chunk.toString("utf8")
            })

            child.stderr.on("data", chunk => {
                stderrData += chunk.toString("utf8")
            })

            child.on("error", err => {
                on_error(['failed to spawn', { message: Message(err.message) }])
            })

            child.on("close", exitCode => {
                //what does an exit code of null even mean?

                if (exitCode === 0) {
                    on_success()
                } else {
                    on_error(['non zero exit code', {
                        'exit code': exitCode === null ? _p.optional.literal.not_set() : _p.optional.literal.set(exitCode),
                        'stderr': Message(stderrData),
                        'stdout': Message(stdoutData),
                    }])
                }
            })
        }
    })
})
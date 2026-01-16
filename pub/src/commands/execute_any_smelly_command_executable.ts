import * as _pc from 'pareto-core-command'

import * as _p from 'pareto-core-internals/dist/sync/expression/initialize'

import { __command } from 'pareto-core-internals/dist/algorithm_types/command/command'
import { __command_promise } from 'pareto-core-internals/dist/algorithm_types/command/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { spawn } from "node:child_process"

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
                shell: false, // ✅ direct execution, no shell
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
                on_error(['failed to spawn', { message: err instanceof Error ? err.message : `${err}` }])
            })

            child.on("close", exitCode => {
                //what does an exit code of null even mean?

                if (exitCode === 0) {
                    on_success()
                } else {
                    on_error(['non zero exit code', {
                        'exit code': exitCode === null ? _p.optional.not_set() : _p.optional.set(exitCode),
                        'stderr': stderrData,
                        'stdout': stdoutData,
                    }])
                }
            })
        }
    })
})
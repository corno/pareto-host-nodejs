import * as _pc from 'pareto-core/dist/command'
import * as _p from 'pareto-core/dist/__internals/sync/expression/initialize'

import { __command } from 'pareto-core/dist/command/command'
import { __command_promise } from 'pareto-core/dist/command/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { spawn } from "node:child_process"

/**
 * 
 * The executable being executed is assumed to only cause side effects
 * and not return any meaningful data, std::out is therefor ignored
 */
export const $$: resources.commands.execute_any_command_executable = __command((
    $p,
) => {
    const args = $p.args.__get_raw_copy()
    return __command_promise({
        'execute': (on_success, on_error) => {

            const child = spawn($p.program, args, {
                shell: false, // ✅ direct execution, no shell
            })

            let stderrData = ""

            child.stderr.on("data", chunk => {
                stderrData += chunk.toString("utf8")
            })

            child.on("error", err => {
                on_error(['failed to spawn', { message: _p.list.literal( err instanceof Error ? err.message.split("\n") : [`${err}`] ) }])
            })

            child.on("close", exitCode => {
                if (exitCode === 0) {
                    on_success()
                } else {
                    on_error(['non zero exit code', {
                        'exit code': exitCode === null ? _p.optional.not_set() : _p.optional.set(exitCode),
                        'stderr': _p.list.literal(stderrData.split("\n")),
                    }])
                }
            })
        }
    })
})
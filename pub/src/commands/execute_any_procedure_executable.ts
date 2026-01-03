import * as _pc from 'pareto-core-command'
import * as _pinternals from 'pareto-core-internals'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { spawn } from "node:child_process"

/**
 * 
 * The executable being executed is assumed to only cause side effects
 * and not return any meaningful data, std::out is therefor ignored
 */
export const $$: resources.commands.execute_any_command_executable = _pc.__command( (
    $p,
) => {
    const args = $p.args.__get_raw_copy()
    return _pc.__command_promise({
        'execute': (on_success, on_error) => {

            const child = spawn($p.program, args, {
                shell: false, // ✅ direct execution, no shell
            })

            let stderrData = ""

            child.stderr.on("data", chunk => {
                stderrData += chunk.toString("utf8")
            })

            child.on("error", err => {
                on_error(_pinternals.block(() => {
                    return ['failed to spawn', { message: err instanceof Error ? err.message : `${err}` }]
                }))
            })

            child.on("close", exitCode => {
                if (exitCode === 0) {
                    on_success()
                } else {
                    on_error(_pinternals.block(() => {
                        return ['non zero exit code', {
                            'exit code': exitCode === null ? _pinternals.optional_not_set() : _pinternals.optional_set(exitCode),
                            'stderr': stderrData
                        }]
                    }))
                }
            })
        }
    })
})
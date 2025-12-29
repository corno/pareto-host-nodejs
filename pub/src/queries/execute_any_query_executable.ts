import * as _pq from 'pareto-core-query'
import * as _pinternals from 'pareto-core-internals'

//interface
import * as resources from "exupery-resources/dist/interface/resources"

//dependencies
import { spawn } from "node:child_process"


/**
 * 
 * The executable being executed is assumed to be side effect free
 * There is no way to give guarantees about that though
 */
export const $$: resources.queries.execute_any_query_executable = _pq.__create_query(
    ($p,) => {
        const args = $p.args.__get_raw_copy()
        return _pq.__create_query_result((on_value, on_error) => {

            const child = spawn($p.program, args, {
                shell: false, // ✅ no implicit parsing
            })

            let stdoutData = ""
            let stderrData = ""

            child.stdout.on("data", chunk => {
                stdoutData += chunk.toString("utf8")
            })

            child.stderr.on("data", chunk => {
                stderrData += chunk.toString("utf8")
            })

            child.on("error", err => {
                on_error(_pinternals.block(() => {
                    return ['failed to spawn', {
                        message: err instanceof Error ? err.message : `${err}`
                    }]
                }))
            })

            child.on("close", exitCode => {
                if (exitCode === 0) {
                    on_value({
                        stdout: stdoutData,
                    })
                } else {
                    on_error(_pinternals.block(() => {
                        return ['non zero exit code', {
                            'exit code': exitCode === null ? _pinternals.not_set() : _pinternals.set(exitCode),
                            'stderr': stderrData,
                        }]
                    }))
                }
            })
        })
    }
)
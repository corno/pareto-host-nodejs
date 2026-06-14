import * as _pq from 'pareto-core/dist/query/implementation'
import * as _p from 'pareto-core/dist/assign'

import __query from 'pareto-core/dist/query/implementation/query'
import __query_result from 'pareto-core/dist/query/implementation/__query_result'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { spawn } from "node:child_process"
import { Message } from '../../terminal_output'
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"


/**
 * 
 * The executable being executed is assumed to be side effect free
 * There is no way to give guarantees about that though
 */
export const $$: resources.execute_unrestricted.queries.query_executable = __query(
    ($p,) => {
        const args = $p.args.__get_raw_copy()
        return __query_result((on_value, on_error) => {

            let cwd: string | undefined = undefined
            $p['working directory'].__extract_data(
                ($) => {
                    cwd = t_path_to_text.Context_Path($)
                },
                () => { },
            )

            const child = spawn($p.program, args, {
                'cwd': cwd,
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
                on_error(_p.state.block(() => {
                    if (!(err instanceof Error)) {
                        throw new Error(`Expected an Error instance, got: ${typeof err}`)
                    }
                    return ['failed to spawn', {
                        message: Message(err.message),
                    }]
                }))
            })

            child.on("close", exitCode => {
                if (exitCode === 0) {
                    on_value({
                        'stdout': Message(stdoutData),
                    })
                } else {
                    on_error(_p.state.block(() => {
                        return ['non zero exit code', {
                            'exit code': exitCode === null ? _p.optional.literal.not_set() : _p.optional.literal.set(exitCode),
                            'stderr': Message(stderrData),
                        }]
                    }))
                }
            })
        })
    }
)
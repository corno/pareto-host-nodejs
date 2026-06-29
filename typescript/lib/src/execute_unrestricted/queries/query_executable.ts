import * as p_ from 'pareto-core/dist/implementation/query'
import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'
import p_query from 'pareto-core/dist/implementation/query/__internal/query'
import p_query_result from 'pareto-core/dist/implementation/query/__internal/query_result'

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
export const $$: resources.execute_unrestricted.queries.query_executable = p_query(
    ($p,) => {
        const args = $p.args.__get_raw()
        return p_query_result((on_value, on_error) => {

            const wd_raw = $p['working directory'].__get_raw()

            const child = spawn($p.program, args, {
                'cwd': wd_raw === null
                    ? undefined
                    : t_path_to_text.Context_Path(wd_raw[0]),
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
                on_error(p_change_context(null, () => {
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
                    on_error(p_change_context(null, () => {
                        return ['non zero exit code', {
                            'exit code': exitCode === null ? p_.literal.not_set() : p_.literal.set(exitCode),
                            'stderr': Message(stderrData),
                        }]
                    }))
                }
            })
        })
    }
)
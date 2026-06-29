
import * as p_ from 'pareto-core/dist/implementation/command'
import p_command from 'pareto-core/dist/implementation/command/__internal/command'
import p_command_promise from 'pareto-core/dist/implementation/command/__internal/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { spawn } from "node:child_process"
import { Message } from '../../terminal_output'
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"

// import { Signature } from "pareto-resources/dist/interface/algorithms/commands/execute_smelly_procedure_executable"


/**
 * 
 * The executable being executed is assumed to only cause side effects
 * and not return any meaningful data, std::out is therefor ignored
 */
export const $$: resources.execute_unrestricted.commands.smelly_command_executable = p_command(
    ($p) => p_command_promise({
        'execute': (on_success, on_error) => {

            const wd_raw = $p['working directory'].__get_raw()

            const child = spawn(
                $p.program,
                $p.args.__get_raw(),
                {
                    'cwd': wd_raw === null
                        ? undefined
                        : t_path_to_text.Context_Path(wd_raw[0]),
                    shell: false, // direct execution, no shell
                    stdio: ['pipe', 'pipe', 'pipe'], // explicitly pipe stdin, stdout, stderr
                }
            )

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
                        'exit code': exitCode === null ? p_.literal.not_set() : p_.literal.set(exitCode),
                        'stderr': Message(stderrData),
                        'stdout': Message(stdoutData),
                    }])
                }
            })
        }
    })
)
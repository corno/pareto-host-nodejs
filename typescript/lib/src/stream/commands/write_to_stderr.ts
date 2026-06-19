
import p_command from 'pareto-core/dist/implementation/command/command'
import p_command_promise from 'pareto-core/dist/implementation/command/command_promise'

//interface
import * as interface_ from "pareto-stream/dist/interface/commands"

export const $$: interface_.commands.write_to_stderr = p_command(
    ($p) => p_command_promise({
        'execute': (on_success) => {
            process.stderr.write($p.data)
            on_success()
        }
    })
)
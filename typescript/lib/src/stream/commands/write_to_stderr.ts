
import p_command from 'pareto-core/implementation/__internal/command/command'
import p_command_promise from 'pareto-core/implementation/__internal/command/command_promise'

//interface
import * as interface_ from "pareto-stream/interface/commands"

export const $$: interface_.commands.write_to_stderr = p_command(
    ($p) => p_command_promise({
        'execute': (on_success) => {
            process.stderr.write($p.data)
            on_success()
        }
    })
)
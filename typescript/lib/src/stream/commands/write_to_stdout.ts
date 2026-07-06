
import p_command from 'pareto-core/implementation/__internal/command/command'
import p_command_promise from 'pareto-core/implementation/__internal/command/command_promise'

//interface
import * as resources from "pareto-stream/interface/commands"

export const $$: resources.commands.write_to_stdout = p_command(
    ($p) => p_command_promise({
        'execute': (on_success) => {
            process.stdout.write($p.data)
            on_success()
        }
    })
)

import p_command from 'pareto-core/dist/implementation/command/__internal/command'
import p_command_promise from 'pareto-core/dist/implementation/command/__internal/command_promise'

//interface
import * as resources from "pareto-stream/dist/interface/commands"

export const $$: resources.commands.write_to_stdout = p_command(
    ($p) => p_command_promise({
        'execute': (on_success) => {
            process.stdout.write($p.data)
            on_success()
        }
    })
)
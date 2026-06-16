
import command from 'pareto-core/dist/implementation/command/command'
import command_promise from 'pareto-core/dist/implementation/command/command_promise'

//interface
import * as interface_ from "pareto-stream/dist/interface/commands"

export const $$: interface_.commands.write_to_stderr = command(
    ($p) => command_promise({
        'execute': (on_success) => {
            process.stderr.write($p.data)
            on_success()
        }
    })
)

import __command from 'pareto-core/dist/command/implementation/command'
import __command_promise from 'pareto-core/dist/command/implementation/command_promise'

//interface
import * as resources from "pareto-stream/dist/interface/commands"

export const $$: resources.commands.write_to_stderr = __command( (
    $p,
) => {
    return __command_promise({
        'execute': (on_success) => {
            process.stderr.write($p.data)
            on_success()
        }
    })
})
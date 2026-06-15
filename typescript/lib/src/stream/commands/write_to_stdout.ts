
import __command from 'pareto-core/dist/implementation/command/command'
import __command_promise from 'pareto-core/dist/implementation/command/command_promise'

//interface
import * as resources from "pareto-stream/dist/interface/commands"

export const $$: resources.commands.write_to_stdout = __command((
    $d,
) => {
    return __command_promise({
        'execute': (on_success) => {
            process.stdout.write($d.data)
            on_success()
        }
    })
})
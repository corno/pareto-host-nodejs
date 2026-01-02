import * as _pc from 'pareto-core-command'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

export const $$: resources.commands.write_to_stdout = _pc.__command((
    $p,
) => {
    return _pc.__command_promise({
        'execute': (on_success) => {
            process.stdout.write($p)
            on_success()
        }
    })
})
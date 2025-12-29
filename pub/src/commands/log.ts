import * as _pc from 'pareto-core-command'

//interface
import * as resources from "exupery-resources/dist/interface/resources"

export const $$: resources.commands.log = _pc.__create_resource_command( (
    $p,
) => {
    return _pc.__create_command_promise({
        'execute': (on_success) => {
            $p.lines.__for_each(($) => {
                process.stdout.write($ + `\n`)
            })
            on_success()
        }
    })
})
import * as _pc from 'pareto-core-command'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

export const $$: resources.commands.log_error = _pc.__command((
    $p,
) => {
    return _pc.__command_promise({
        'execute': (on_success) => {
            $p.lines.__for_each(($) => {
                process.stderr.write($ + `\n`)
            })
            on_success()
        }
    })
})
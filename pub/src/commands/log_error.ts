import * as _pc from 'pareto-core-command'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

import { __command } from 'pareto-core-internals/dist/algorithm_types/command/command'
import { __command_promise } from 'pareto-core-internals/dist/algorithm_types/command/command_promise'

export const $$: resources.commands.log_error = __command((
    $p,
) => {
    return __command_promise({
        'execute': (on_success) => {
            $p.lines.__for_each(($) => {
                process.stderr.write($ + `\n`)
            })
            on_success()
        }
    })
})
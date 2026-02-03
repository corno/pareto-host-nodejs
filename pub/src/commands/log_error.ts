import * as _pc from 'pareto-core/dist/command'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

import { __command } from 'pareto-core/dist/__internals/async/command'
import { __command_promise } from 'pareto-core/dist/__internals/async/command_promise'

export const $$: resources.commands.log_error = __command((
    $p,
) => {
    return __command_promise({
        'execute': (on_success) => {
            $p.lines.__get_raw_copy().forEach(($) => {
                process.stderr.write($ + `\n`)
            })
            on_success()
        }
    })
})
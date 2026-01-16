import * as _pc from 'pareto-core-command'

import { __command } from 'pareto-core-internals/dist/algorithm_types/command/command'
import { __command_promise } from 'pareto-core-internals/dist/algorithm_types/command/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

export const $$: resources.commands.write_to_stdout = __command((
    $p,
) => {
    return __command_promise({
        'execute': (on_success) => {
            process.stdout.write($p)
            on_success()
        }
    })
})
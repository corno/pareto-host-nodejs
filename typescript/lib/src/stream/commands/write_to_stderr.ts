import * as _pc from 'pareto-core/dist/command'

import __command from 'pareto-core/dist/__internals/async/command'
import __command_promise from 'pareto-core/dist/__internals/async/command_promise'

//interface
import * as resources from "pareto-stream/dist/interface/resources"

export const $$: resources.stream.commands.write_to_stderr = __command( (
    $p,
) => {
    return __command_promise({
        'execute': (on_success) => {
            process.stderr.write($p)
            on_success()
        }
    })
})
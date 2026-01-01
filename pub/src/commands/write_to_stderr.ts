import * as _pc from 'pareto-core-command'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

export const $$: resources.commands.write_to_stderr = _pc.__create_resource_command( (
    $p,
) => {
    return _pc.__create_command_promise({
        'execute': (on_success) => {
            process.stderr.write($p)
            on_success()
        }
    })
})
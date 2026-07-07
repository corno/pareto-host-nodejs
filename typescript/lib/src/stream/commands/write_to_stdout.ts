import * as p_ from 'pareto-core/implementation/resource'

//interface
import * as resources from "pareto-stream/interface/commands"

export const $$: resources.commands.write_to_stdout = p_.command(($p, on_success) => {
    process.stdout.write($p.data)
    on_success()
})
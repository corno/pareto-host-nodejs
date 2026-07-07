import * as p_ from 'pareto-core/implementation/resource'

//interface
import * as interface_ from "pareto-stream/interface/commands"

export const $$: interface_.commands.write_to_stderr = p_.command(($p, on_success) => {
    process.stderr.write($p.data)
    on_success()
})
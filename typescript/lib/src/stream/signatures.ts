import * as p_ from 'pareto-core/interface/resource'


import * as commands from "pareto-stream/interface/commands"
import * as queries from "pareto-stream/interface/queries"


export type Resources = p_.Resource<
    {
        'log error': commands.commands.log_error
        'log': commands.commands.log
        'write to stderr': commands.commands.write_to_stderr
        'write to stdout': commands.commands.write_to_stdout
    },
    {
        'get instream data': queries.queries.get_instream_data
    }
>
import * as p_temp from '../temp_core.js'


import * as commands from "pareto-stream/interface/commands"
import * as queries from "pareto-stream/interface/queries"


export type Resources = p_temp.Resource_Collection<
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
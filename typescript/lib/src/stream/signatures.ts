import * as _pi from 'pareto-core/dist/interface'
import * as _pi_temp from '../temp_core'


import * as resources from "pareto-stream/dist/interface/resources"


export type Resources = _pi_temp.Resource_Collection<
    {
        'log error': resources.commands.log_error
        'log': resources.commands.log
        'write to stderr': resources.commands.write_to_stderr
        'write to stdout': resources.commands.write_to_stdout
    },
    {
        'get instream data': resources.queries.get_instream_data
    }
>
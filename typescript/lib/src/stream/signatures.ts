import * as _pi from 'pareto-core/dist/interface'
import * as _pi_temp from '../temp_core'


import * as resources from "pareto-resources/dist/interface/resources"


export type Resources = _pi_temp.Resource_Collection<
    {
        'log error': resources.stream.commands.log_error
        'log': resources.stream.commands.log
        'write to stderr': resources.stream.commands.write_to_stderr
        'write to stdout': resources.stream.commands.write_to_stdout
    },
    {
        'get instream data': resources.stream.queries.get_instream_data
    }
>
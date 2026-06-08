import * as _pi from 'pareto-core/dist/interface'
import * as _pi_temp from '../temp_core'

import * as d_get_instream_data from "pareto-resources/dist/interface/generated/liana/schemas/stream_get_instream_data/data"
import * as d_log from "pareto-resources/dist/interface/generated/liana/schemas/stream_log/data"
import * as d_log_error from "pareto-resources/dist/interface/generated/liana/schemas/stream_log_error/data"
import * as d_write_to_stderr from "pareto-resources/dist/interface/generated/liana/schemas/stream_write_to_stderr/data"
import * as d_write_to_stdout from "pareto-resources/dist/interface/generated/liana/schemas/stream_write_to_stdout/data"

export type Resources = _pi_temp.Resource_Collection<
    {
        'log error': _pi_temp.Command_Creator<null, d_log_error.Parameters, null>
        'log': _pi_temp.Command_Creator<null, d_log.Parameters, null>
        'write to stderr': _pi_temp.Command_Creator<null, d_write_to_stderr.Parameters, null>
        'write to stdout': _pi_temp.Command_Creator<null, d_write_to_stdout.Parameters, null>
    },
    {
        'get instream data': _pi_temp.Query_Creator<d_get_instream_data.Result, null, d_get_instream_data.Parameters, null>
    }
>
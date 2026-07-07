import * as p_ from 'pareto-core/interface/resource'

import { $$ as c_stream_log_error } from "./commands/log_error.js"
import { $$ as c_stream_log } from "./commands/log.js"
import { $$ as c_stream_write_to_stderr } from "./commands/write_to_stderr.js"
import { $$ as c_stream_write_to_stdout } from "./commands/write_to_stdout.js"

import { $$ as q_stream_get_instream_data } from "./queries/get_instream_data.js"

export const $: p_.Resource = {
    'commands': {
        'log error': c_stream_log_error,
        'log': c_stream_log,
        'write to stderr': c_stream_write_to_stderr,
        'write to stdout': c_stream_write_to_stdout,

    },
    'queries': {
        'get instream data': q_stream_get_instream_data,
    }
}
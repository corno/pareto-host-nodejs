import { Resources } from "./signatures"

import { $$ as c_stream_log_error } from "./commands/log_error"
import { $$ as c_stream_log } from "./commands/log"
import { $$ as c_stream_write_to_stderr } from "./commands/write_to_stderr"
import { $$ as c_stream_write_to_stdout } from "./commands/write_to_stdout"

import { $$ as q_stream_get_instream_data } from "./queries/get_instream_data"

export const $: Resources = {
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
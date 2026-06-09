import { Resources } from "./signatures"

import { $$ as p_stream_log_error } from "./commands/log_error"
import { $$ as p_stream_log } from "./commands/log"
import { $$ as p_stream_write_to_stderr } from "./commands/write_to_stderr"
import { $$ as p_stream_write_to_stdout } from "./commands/write_to_stdout"

import { $$ as q_stream_get_instream_data } from "./queries/get_instream_data"

export const $: Resources = {
    'commands': {
        'log error': p_stream_log_error,
        'log': p_stream_log,
        'write to stderr': p_stream_write_to_stderr,
        'write to stdout': p_stream_write_to_stdout,

    },
    'queries': {
        'get instream data': q_stream_get_instream_data,
    }
}
import * as _pi from 'pareto-core-interface'
import * as _pinternals from 'pareto-core-internals'

import { signature } from './signature'

import { $$ as p_copy_signature } from "./commands/copy"
import { $$ as p_execute_any_procedure_executable } from "./commands/execute_any_procedure_executable"
import { $$ as p_execute_any_smelly_procedure_executable } from "./commands/execute_any_smelly_procedure_executable"
import { $$ as p_log } from "./commands/log"
import { $$ as p_log_error } from "./commands/log_error"
import { $$ as p_make_directory } from "./commands/make_directory"
import { $$ as p_remove } from "./commands/remove"
import { $$ as p_write_file } from "./commands/write_file"
import { $$ as p_write_to_stderr } from "./commands/write_to_stderr"
import { $$ as p_write_to_stdout } from "./commands/write_to_stdout"


import { $$ as q_execute_any_query_executable } from "./queries/execute_any_query_executable"
import { $$ as q_get_instream_data } from "./queries/get_instream_data"
import { $$ as q_read_directory } from "./queries/read_directory"
import { $$ as q_read_file } from "./queries/read_file"
import { $$ as q_stat } from "./queries/stat"

/**
 * Runs a program main function, passing command line arguments (excluding
 * `node` and the script name), and setting the process exit code to the
 * returned value when the async value completes.
 */
export const run_main_procedure: signature = (
    get_main
) => {
    get_main({
        'commands': {
            'copy': p_copy_signature,
            'execute any procedure executable': p_execute_any_procedure_executable,
            'execute any smelly procedure executable': p_execute_any_smelly_procedure_executable,
            'log error': p_log_error,
            'log': p_log,
            'make directory': p_make_directory,
            'remove': p_remove,
            'write file': p_write_file,
            'write to stderr': p_write_to_stderr,
            'write to stdout': p_write_to_stdout,
        },
        'queries': {
            'execute any query executable': q_execute_any_query_executable,
            'get instream data': q_get_instream_data,
            'read directory': q_read_directory,
            'read file': q_read_file,
            // 'stat': q_stat,
        }
    }).execute(
        {
            'arguments': _pinternals.list_literal(process.argv.slice(2))
        },
        ($) => $,
    ).__start(
        () => {
        },
        ($) => {
            process.exitCode = $['exit code']
        }
    )
}
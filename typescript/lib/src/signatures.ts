import * as _pi from 'pareto-core/dist/interface'

import * as d_chmod from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_chmod/data"
import * as d_copy from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_copy/data"
import * as d_execute_any_command_executable from "pareto-resources/dist/interface/generated/liana/schemas/execute_any_command_executable/data"
import * as d_execute_any_smelly_command_executable from "pareto-resources/dist/interface/generated/liana/schemas/execute_any_smelly_command_executable/data"
import * as d_execute_any_query_executable from "pareto-resources/dist/interface/generated/liana/schemas/execute_any_query_executable/data"
import * as d_get_instream_data from "pareto-resources/dist/interface/generated/liana/schemas/stream_get_instream_data/data"
import * as d_log from "pareto-resources/dist/interface/generated/liana/schemas/stream_log/data"
import * as d_log_error from "pareto-resources/dist/interface/generated/liana/schemas/stream_log_error/data"
import * as d_make_directory from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_make_directory/data"
import * as d_read_directory from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_read_directory/data"
import * as d_read_file from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_read_file/data"
import * as d_remove from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_remove/data"
import * as d_stat from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_stat/data"
import * as d_stat_possible_node from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_stat_possible_node/data"
import * as d_write_file from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_write_file/data"
import * as d_write_to_stderr from "pareto-resources/dist/interface/generated/liana/schemas/stream_write_to_stderr/data"
import * as d_write_to_stdout from "pareto-resources/dist/interface/generated/liana/schemas/stream_write_to_stdout/data"

import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"

export type Available_Standard_Resources = {
    'commands': {
        'chmod': _pi.Command<d_chmod.Error, d_chmod.Parameters>
        'copy': _pi.Command<d_copy.Error, d_copy.Parameters>
        'execute any command executable': _pi.Command<d_execute_any_command_executable.Error, d_execute_any_command_executable.Parameters>
        'execute any smelly command executable': _pi.Command<d_execute_any_smelly_command_executable.Error, d_execute_any_smelly_command_executable.Parameters>
        'log error': _pi.Command<null, d_log_error.Parameters>
        'log': _pi.Command<null, d_log.Parameters>
        'make directory': _pi.Command<d_make_directory.Error, d_make_directory.Parameters>
        'remove': _pi.Command<d_remove.Error, d_remove.Parameters>
        'write file': _pi.Command<d_write_file.Error, d_write_file.Parameters>
        'write to stderr': _pi.Command<null, d_write_to_stderr.Parameters>
        'write to stdout': _pi.Command<null, d_write_to_stdout.Parameters>
    },
    'queries': {
        'execute any query executable': _pi.Query<d_execute_any_query_executable.Result, d_execute_any_query_executable.Error, d_execute_any_query_executable.Parameters>
        'get instream data': _pi.Query<d_get_instream_data.Result, null, d_get_instream_data.Parameters>
        'read directory': _pi.Query<d_read_directory.Result, d_read_directory.Error, d_read_directory.Parameters>
        'read file': _pi.Query<d_read_file.Result, d_read_file.Error, d_read_file.Parameters>
        // 'stat': _pi.Query<d_stat.Parameters, d_stat.Result, d_stat.Error>
        'stat possible node': _pi.Query<d_stat_possible_node.Result, d_stat_possible_node.Error, d_stat_possible_node.Parameters>
    }
}

export type main = (
    get_main: ($r: Available_Standard_Resources) => _pi.Command<d_main.Error, d_main.Parameters>,
) => void

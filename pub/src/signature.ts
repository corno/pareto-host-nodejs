import * as _pi from 'pareto-core-interface'
import * as _pinternals from 'pareto-core-internals'

import * as d_copy from "pareto-resources/dist/interface/generated/pareto/schemas/copy/data_types/source"
import * as d_execute_any_procedure_executable from "pareto-resources/dist/interface/generated/pareto/schemas/execute_any_procedure_executable/data_types/target"
import * as d_execute_any_smelly_procedure_executable from "pareto-resources/dist/interface/generated/pareto/schemas/execute_any_smelly_procedure_executable/data_types/target"
import * as d_execute_any_query_executable from "pareto-resources/dist/interface/generated/pareto/schemas/execute_any_query_executable/data_types/target"
import * as d_get_instream_data from "pareto-resources/dist/interface/generated/pareto/schemas/get_instream_data/data_types/target"
import * as d_log from "pareto-resources/dist/interface/generated/pareto/schemas/log/data_types/target"
import * as d_log_error from "pareto-resources/dist/interface/generated/pareto/schemas/log_error/data_types/target"
import * as d_make_directory from "pareto-resources/dist/interface/generated/pareto/schemas/make_directory/data_types/source"
import * as d_read_directory from "pareto-resources/dist/interface/generated/pareto/schemas/read_directory/data_types/target"
import * as d_read_file from "pareto-resources/dist/interface/generated/pareto/schemas/read_file/data_types/target"
import * as d_remove from "pareto-resources/dist/interface/generated/pareto/schemas/remove/data_types/source"
import * as d_stat from "pareto-resources/dist/interface/generated/pareto/schemas/stat/data_types/target"
import * as d_write_file from "pareto-resources/dist/interface/generated/pareto/schemas/write_file/data_types/source"
import * as d_write_to_stderr from "pareto-resources/dist/interface/generated/pareto/schemas/write_to_stderr/data_types/target"
import * as d_write_to_stdout from "pareto-resources/dist/interface/generated/pareto/schemas/write_to_stdout/data_types/target"

import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"

export type Available_Standard_Resources = {
    'commands': {
        'copy': _pi.Command<d_copy.Error, d_copy.Parameters>
        'execute any procedure executable': _pi.Command<d_execute_any_procedure_executable.Error, d_execute_any_procedure_executable.Parameters>
        'execute any smelly procedure executable': _pi.Command<d_execute_any_smelly_procedure_executable.Error, d_execute_any_smelly_procedure_executable.Parameters>
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
        //'stat': _pi.Query<d_stat.Parameters, d_stat.Result, d_stat.Error>
    }
}

export type signature = (
    get_main: ($r: Available_Standard_Resources) => _pi.Command<d_main.Error, d_main.Parameters>,
) => void

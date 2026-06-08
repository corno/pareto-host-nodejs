import * as _pi from 'pareto-core/dist/interface'
import * as _pi_temp from '../temp_core'


import * as d_execute_command_executable from "pareto-resources/dist/interface/generated/liana/schemas/execute_command_executable/data"
import * as d_execute_smelly_command_executable from "pareto-resources/dist/interface/generated/liana/schemas/execute_smelly_command_executable/data"
import * as d_execute_query_executable from "pareto-resources/dist/interface/generated/liana/schemas/execute_query_executable/data"

export type Resources = _pi_temp.Resource_Collection<
    {
        'command executable': _pi_temp.Command_Creator<d_execute_command_executable.Error, d_execute_command_executable.Parameters, null>
        'smelly command executable': _pi_temp.Command_Creator<d_execute_smelly_command_executable.Error, d_execute_smelly_command_executable.Parameters, null>
    },
    {
        'query executable': _pi_temp.Query_Creator<d_execute_query_executable.Result, d_execute_query_executable.Error, d_execute_query_executable.Parameters, null>
    }
>
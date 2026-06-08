import * as _pi from 'pareto-core/dist/interface'
import * as _pi_temp from '../temp_core'

import * as d_chmod from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_chmod/data"
import * as d_copy from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_copy/data"
import * as d_make_directory from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_make_directory/data"
import * as d_read_directory from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_read_directory/data"
import * as d_read_file from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_read_file/data"
import * as d_remove from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_remove/data"
import * as d_stat_possible_node from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_stat_possible_node/data"
import * as d_write_file from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_write_file/data"

export type Resources = _pi_temp.Resource_Collection<
    {
        'chmod': _pi_temp.Command_Creator<d_chmod.Error, d_chmod.Parameters, null>
        'copy': _pi_temp.Command_Creator<d_copy.Error, d_copy.Parameters, null>
        'make directory': _pi_temp.Command_Creator<d_make_directory.Error, d_make_directory.Parameters, null>
        'remove': _pi_temp.Command_Creator<d_remove.Error, d_remove.Parameters, null>
        'write file': _pi_temp.Command_Creator<d_write_file.Error, d_write_file.Parameters, null>

    },
    {
        'read directory': _pi_temp.Query_Creator<d_read_directory.Result, d_read_directory.Error, d_read_directory.Parameters, null>
        'read file': _pi_temp.Query_Creator<d_read_file.Result, d_read_file.Error, d_read_file.Parameters, null>
        // 'stat': _pi_temp.Query_Creator<d_stat.Parameters, d_stat.Result, d_stat.Error, null>
        'stat possible node': _pi_temp.Query_Creator<d_stat_possible_node.Result, d_stat_possible_node.Error, d_stat_possible_node.Parameters, null>
    }
>
import * as _pc from 'pareto-core/dist/command'
import * as _p from 'pareto-core/dist/assign'

import __command from 'pareto-core/dist/__internals/async/command'
import __command_promise from 'pareto-core/dist/__internals/async/command_promise'

import _p_text_from_list from "pareto-core/dist/_p_text_from_list"

//data types
import * as d_fs_unrestricted_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"

//interface
import * as resources from "pareto-resources/dist/interface/resources"


//dependencies
import * as c_unrestricted from "../../file_system_unrestricted/commands/write_file"
import * as t_sandboxed_path_to_unrestricted_path from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/sandboxed_path"

export const $$: (
    $x: {
        'context': d_fs_unrestricted_path.Context_Path
    }
) => resources.commands.fs_sandboxed_write_file = ($x) => __command(
    ($p) => c_unrestricted.$$.execute(
        {
            'data': $p.data,
            'path': t_sandboxed_path_to_unrestricted_path.Node_Path(
                $p.path,
                {
                    'context': $x.context,
                }
            ),
        },
        ($) => $
    )
)
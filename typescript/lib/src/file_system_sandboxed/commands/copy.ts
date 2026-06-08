import { __create_command } from '../../temp_core'

//data types
import * as d_fs_unrestricted_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_fs_sandboxed from "pareto-resources/dist/interface/generated/liana/schemas/fs_sandboxed_copy/data"

//dependencies
import * as c_unrestricted from "../../file_system_unrestricted/commands/copy"
import * as t_sandboxed_path_to_unrestricted_path from "pareto-resources/dist/implementation/manual/transformers/sandboxed_path/unrestricted_path"


export const $$ = __create_command(
    (
        $x: {
            'source context': d_fs_unrestricted_path.Context_Path
            'target context': d_fs_unrestricted_path.Context_Path
        }
    ) => ($p: d_fs_sandboxed.Parameters) => c_unrestricted.$$.execute(
        {
            'options': $p.options,
            'target': t_sandboxed_path_to_unrestricted_path.Node_Path(
                $p.target,
                {
                    'context': $x['target context'],
                }
            ),
            'source': t_sandboxed_path_to_unrestricted_path.Node_Path(
                $p.source,
                {
                    'context': $x['source context'],
                }
            ),
        },
        ($) => $
    )
)
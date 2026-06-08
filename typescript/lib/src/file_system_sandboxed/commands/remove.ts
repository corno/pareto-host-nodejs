import { __create_command } from '../../temp_core'

//data types
import * as d_fs_unrestricted_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_fs_sandboxed from "pareto-resources/dist/interface/generated/liana/schemas/fs_sandboxed_remove/data"

//dependencies
import * as c_unrestricted from "../../file_system_unrestricted/commands/remove"
import * as t_sandboxed_path_to_unrestricted_path from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/sandboxed_path"


// export const $$ = __create_command(
//     (
//         $x: {
//             'context': d_fs_unrestricted_path.Context_Path
//         }
//     ) => ($p: d_fs_sandboxed.Parameters) => c_unrestricted.$$.execute(
//         {
//             'error if not exists': $p['error if not exists'],
//             'path': t_sandboxed_path_to_unrestricted_path.Node_Path(
//                 $p.path,
//                 {
//                     'context': $x.context,
//                 }
//             ),
//         },
//         ($) => $
//     )
// )
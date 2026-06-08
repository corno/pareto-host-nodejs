// import * as _pq from 'pareto-core/dist/query'
// import * as _p from 'pareto-core/dist/assign'

// import __query from 'pareto-core/dist/__internals/async/query'
// import __query_result from 'pareto-core/dist/__internals/async/__query_result'


// //interface
// import * as resources from "pareto-resources/dist/interface/resources"

// //dependencies
// import { stat as fs_stat } from "fs"
// import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"

// export const $$: resources.filesystem_sandboxed.queries.stat_possible_node = __query((
//     $p
// ) => {
//     return __query_result((on_value, on_error) => {
//         fs_stat(
//             t_path_to_text.Node_Path($p),
//             (err, stats) => {
//                 if (err) {
//                     if (err.code === 'ENOENT') {
//                         on_value(['does not exist', null])
//                     } else {
//                         on_error({
//                             'path': $p,
//                             'type': _p.state.block(() => {
//                                 throw new Error(`unhandled fs.stat error code: ${err.code}`)
//                             })
//                         })
//                     }
//                 } else {
//                     on_value(stats.isFile()
//                         ? ['file', null]
//                         : ['directory', null]
//                     )
//                 }
//             }
//         )
//     })
// })
import * as p_a from 'pareto-core/dist/assign'

import __query from 'pareto-core/dist/implementation/query/query'
import query_result from 'pareto-core/dist/implementation/query/query_result'


//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { stat as fs_stat } from "fs"
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"

export const $$: resources.filesystem_unrestricted.queries.stat = __query((
    $p
) => {
    return query_result((on_value, on_error) => {
        fs_stat(
            t_path_to_text.Node_Path($p),
            (err, stats) => {
                if (err) {
                    on_error({
                        'path': $p,
                        'type': p_a.state.block(() => {
                            if (err.code === 'ENOENT') {
                                return ['node does not exist', null]
                            }
                            throw new Error(`unhandled fs.stat error code: ${err.code}`)
                        })
                    })
                }
                on_value(stats.isFile()
                    ? ['file', null]
                    : ['directory', null]
                )
            }
        )
    })
})
import p_query from 'pareto-core/implementation/query/__internal/query'
import p_query_result from 'pareto-core/implementation/query/__internal/query_result'
import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

//interface
import * as resources from "pareto-resources/interface/resources"

//dependencies
import { stat as fs_stat } from "fs"
import * as t_path_to_text from "pareto-resources/implementation/manual/transformers/unrestricted_path/text"

export const $$: resources.filesystem_unrestricted.queries.stat_possible_node = p_query((
    $p
) => {
    return p_query_result((on_value, on_error) => {
        fs_stat(
            t_path_to_text.Node_Path($p),
            (err, stats) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        on_value(['does not exist', null])
                    } else {
                        on_error({
                            'path': $p,
                            'type': p_change_context(null, () => {
                                throw new Error(`unhandled fs.stat error code: ${err.code}`)
                            })
                        })
                    }
                } else {
                    on_value(stats.isFile()
                        ? ['file', null]
                        : ['directory', null]
                    )
                }
            }
        )
    })
})
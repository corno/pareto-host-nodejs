import * as _pq from 'pareto-core/dist/query'
import * as _pr from 'pareto-core/dist/refiner'

import { __query } from 'pareto-core/dist/__internals/async/query'
import { __query_result } from 'pareto-core/dist/__internals/async/query_result'


//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { stat as fs_stat } from "fs"
import * as s_path from "pareto-resources/dist/implementation/manual/schemas/path/serializers"

export const $$: resources.queries.stat = __query((
    $p
) => {
    return __query_result((on_value, on_error) => {
        fs_stat(
                s_path.Node_Path($p),
            (err, stats) => {
                if (err) {
                    on_error(_pr.state.block(() => {
                        if (err.code === 'ENOENT') {
                            return ['node does not exist', null]
                        }
                        return _pr.fixme_abort(`unhandled fs.stat error code: ${err.code}`)
                    }))
                }
                on_value(stats.isFile()
                    ? ['file', null]
                    : ['directory', null]
                )
            }
        )
    })
})
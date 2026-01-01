import * as _pq from 'pareto-core-query'
import * as _pinternals from 'pareto-core-internals'


//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { stat as fs_stat } from "fs"
import * as s_path from "pareto-resources/dist/implementation/manual/schemas/path/serializers"

export const $$: resources.queries.stat = _pq.__create_query((
    $p
) => {
    return _pq.__create_query_result((on_value, on_error) => {
        fs_stat(
                s_path.Node_Path($p),
            (err, stats) => {
                if (err) {
                    on_error(_pinternals.block(() => {
                        if (err.code === 'ENOENT') {
                            return ['node does not exist', null]
                        }
                        return _pinternals.panic(`unhandled fs.stat error code: ${err.code}`)
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
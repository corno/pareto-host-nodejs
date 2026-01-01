import * as _pq from 'pareto-core-query'
import * as _pinternals from 'pareto-core-internals'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import * as s_path from "pareto-resources/dist/implementation/manual/schemas/path/serializers"
import { readFile as fs_readFile } from "fs"

export const $$: resources.queries.read_file = _pq.__create_query((
    $p
) => {
    return _pq.__create_query_result((on_value, on_error) => {
        fs_readFile(
            s_path.Node_Path($p),
            { 'encoding': 'utf-8' },
            (err, data) => {
                if (err) {
                    on_error(_pinternals.block(() => {
                        if (err.code === 'ENOENT') {
                            return ['file does not exist', null]
                        }
                        if (err.code === 'EACCES' || err.code === 'EPERM') {
                            return ['permission denied', null]
                        }
                        if (err.code === 'EISDIR' || err.code === 'ENOTDIR') {
                            return ['node is not a file', null]
                        }
                        if (err.code === 'EFBIG') {
                            return ['file too large', null]
                        }
                        if (err.code === 'EIO' || err.code === 'ENXIO') {
                            return ['device not ready', null]
                        }
                        return _pinternals.panic(`unhandled fs.readFile error code: ${err.code}`)
                    }))
                } else {
                    on_value(data)
                }
            }
        )
    })
})
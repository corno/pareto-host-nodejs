import * as _pq from 'pareto-core/dist/query'
import * as _p from 'pareto-core/dist/assign'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import __query from 'pareto-core/dist/__internals/async/query'
import __query_result from 'pareto-core/dist/__internals/async/__query_result'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"
import { readFile as fs_readFile } from "fs"

export const $$: resources.queries.fs_unrestricted_read_file = __query((
    $p
) => {
    return __query_result((on_value, on_error) => {
        fs_readFile(
            t_path_to_text.Node_Path($p),
            { 'encoding': 'utf-8' },
            (err, data) => {
                if (err) {
                    on_error({
                        'path': $p,
                        'type': _p.state.block(() => {
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
                            throw new Error(`unhandled fs.readFile error code: ${err.code}`)
                        })
                    })
                } else {
                    on_value(_p_list_from_text(
                        data,
                        ($) => $
                    ))
                }
            }
        )
    })
})
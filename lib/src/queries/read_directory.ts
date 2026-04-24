import * as _pq from 'pareto-core/dist/query'
import * as _p from 'pareto-core/dist/assign'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

import __query from 'pareto-core/dist/__internals/async/query'
import __query_result from 'pareto-core/dist/__internals/async/__query_result'


//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { readdir as fs_readdir } from "fs"
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/path/text"
import * as t_path_to_path from "pareto-resources/dist/implementation/manual/transformers/path/path"


export const $$: resources.queries.read_directory = __query((
    $p
) => {
    return __query_result((on_value, on_error) => {
        fs_readdir(
            t_path_to_text.Node_Path($p.path),
            {
                'encoding': 'utf-8',
                'withFileTypes': true,
            },
            (err, nodes) => {
                if (err) {
                    on_error({
                        'path': $p.path,
                        'type': _p.state.block(() => {
                            if (err.code === 'ENOENT') {
                                return ['directory does not exist', null]
                            }
                            if (err.code === 'ENOTDIR' || err.code === 'EISDIR') {
                                return ['node is not a directory', null]
                            }
                            throw new Error(`unhandled fs.readdir error code: ${err.code}`)
                        })
                    })
                } else {
                    on_value(
                        _p.dictionary.from.list(
                            _p.list.literal(nodes),
                        ).convert(
                            ($) => $.name,
                            ($) => ({
                                'node type': $.isFile()
                                    ? ['file', null]
                                    : $.isDirectory() ? ['directory', null] : ['other', null],
                                'context directory': t_path_to_path.deprecated_node_path_to_context_path($p.path),
                                'path': t_path_to_path.extend_node_path(
                                    $p.path,
                                    {
                                        'addition': $.name,
                                    }
                                )
                            }),
                            {
                                duplicate_id: ($) => _p_unreachable_code_path("the nodejs api guarantees that all items will have a unique name")
                            },
                        )
                    )
                }
            }
        )
    })
})
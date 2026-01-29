import * as _pq from 'pareto-core/dist/query'

import * as _pr from 'pareto-core/dist/refiner'

import { __query } from 'pareto-core/dist/__internals/async/query'
import { __query_result } from 'pareto-core/dist/__internals/async/query_result'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { readdir as fs_readdir } from "fs"
import * as s_path from "pareto-resources/dist/implementation/manual/schemas/path/serializers"
import * as t_path_to_path from "pareto-resources/dist/implementation/manual/schemas/path/transformers/path"


export const $$: resources.queries.read_directory = __query((
    $p
) => {
    return __query_result((on_value, on_error) => {
        fs_readdir(
            s_path.Node_Path($p.path),
            {
                'encoding': 'utf-8',
                'withFileTypes': true,
            },
            (err, files) => {
                if (err) {
                    on_error(_pr.state.block(() => {
                        if (err.code === 'ENOENT') {
                            return ['directory does not exist', null]
                        }
                        if (err.code === 'ENOTDIR' || err.code === 'EISDIR') {
                            return ['node is not a directory', null]
                        }
                        return _pr.fixme_abort(`unhandled fs.readdir error code: ${err.code}`)
                    }))
                } else {
                    on_value(
                        _pr.dictionary.from_list(
                            _pr.list.literal(files),
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
                            _pr.unreachable_code_path(),
                        )
                    )
                }
            }
        )
    })
})
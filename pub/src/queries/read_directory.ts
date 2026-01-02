import * as _pq from 'pareto-core-query'
import * as _pinternals from 'pareto-core-internals'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { readdir as fs_readdir } from "fs"
import * as s_path from "pareto-resources/dist/implementation/manual/schemas/path/serializers"
import * as t_path_to_path from "pareto-resources/dist/implementation/manual/schemas/path/transformers/path"


export const $$: resources.queries.read_directory = _pq.__query((
    $p
) => {
    return _pq.__query_result((on_value, on_error) => {
        fs_readdir(
            s_path.Node_Path($p.path),
            {
                'encoding': 'utf-8',
                'withFileTypes': true,
            },
            (err, files) => {
                if (err) {
                    on_error(_pinternals.block(() => {
                        if (err.code === 'ENOENT') {
                            return ['directory does not exist', null]
                        }
                        if (err.code === 'ENOTDIR' || err.code === 'EISDIR') {
                            return ['node is not a directory', null]
                        }
                        return _pinternals.panic(`unhandled fs.readdir error code: ${err.code}`)
                    }))
                } else {
                    on_value(_pinternals.build_dictionary(
                        ($i) => {
                            files.forEach((node) => {
                                $i['add entry'](node.name, {
                                    'node type': node.isFile()
                                        ? ['file', null]
                                        : node.isDirectory() ? ['directory', null] : ['other', null],
                                    'context directory': t_path_to_path.deprecated_node_path_to_context_path($p.path),
                                    'path': t_path_to_path.extend_node_path(
                                        $p.path,
                                        {
                                            'addition': node.name,
                                        }
                                    )
                                })
                            })
                        },
                        () => _pinternals.panic(`unreachable`)
                    ))
                }
            }
        )
    })
})
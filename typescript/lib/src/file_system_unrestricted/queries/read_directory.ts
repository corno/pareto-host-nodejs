import * as p_a from 'pareto-core/dist/assign'
import p_unreachable_code_path from 'pareto-core/dist/implementation/specials/unreachable_code_path'
import * as p_di from 'pareto-core/dist/interface/data'

import __query from 'pareto-core/dist/implementation/query/query'
import __query_result from 'pareto-core/dist/implementation/query/__query_result'


//interface
import * as resources from "pareto-resources/dist/interface/resources"

//data types
import * as d_xxx from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_read_directory/data"

//dependencies
import { readdir as fs_readdir } from "fs"
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"
import * as t_path_to_path from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/unrestricted_path"

type ID_Value_Pair<T extends p_di.Value> = {
    readonly 'id': string
    readonly 'value': T
}


export const $$: resources.filesystem_unrestricted.queries.read_directory = __query(
    ($p) => {
        return __query_result((on_value, on_error) => {
            fs_readdir(
                t_path_to_text.Context_Path($p.path),
                {
                    'encoding': 'utf-8',
                    'withFileTypes': true,
                },
                (err, nodes) => {
                    if (err) {
                        on_error({
                            'path': $p.path,
                            'type': p_a.state.block(() => {
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
                        const nodes2 = nodes.map(($): ID_Value_Pair<d_xxx.Result.D> => ({
                            'id': $.name,
                            'value': {
                                'node type': $.isFile()
                                    ? ['file', null]
                                    : $.isDirectory() ? ['directory', null] : ['other', null],
                                'context directory': $p.path,
                                'path': t_path_to_path.create_node_path(
                                    $p.path,
                                    {
                                        'node': $.name,
                                    }
                                )
                            }
                        }))
                        on_value(
                            p_a.dictionary.from.list(
                                p_a.literal.list(nodes2),
                            ).convert(
                                ($) => $.id,
                                ($) => $.value,
                                {
                                    duplicate_id: ($) => p_unreachable_code_path("the nodejs api guarantees that all items will have a unique name")
                                },
                            )
                        )
                    }
                }
            )
        })
    })
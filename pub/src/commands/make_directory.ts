import * as _pc from 'pareto-core/dist/command'
import * as _p from 'pareto-core/dist/assign'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

import { __command } from 'pareto-core/dist/__internals/async/command'
import { __command_promise } from 'pareto-core/dist/__internals/async/command_promise'

//dependencies
import { mkdir as fs_mkdir } from "fs"
import * as t_path_to_text from "../path_to_text"

export const $$: resources.commands.make_directory = __command((
    $p,
) => {
    return __command_promise({
        'execute': (on_success, on_error) => {
            fs_mkdir(
                t_path_to_text.Node_Path($p),
                {
                    'recursive': true,
                },
                (err, path) => {
                    if (err) {
                        on_error({
                            'path': $p,
                            'type': _p.state.block(() => {
                                if (err.code === 'EEXIST') {
                                    return ['directory already exists', null]
                                }
                                throw new Error(`unhandled fs.mkdir error code: ${err.code}`)
                            })
                        })
                    } else {
                        on_success()
                    }
                }
            )
        }
    })
})
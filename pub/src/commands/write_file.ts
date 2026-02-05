import * as _pc from 'pareto-core/dist/command'
import * as _p from 'pareto-core/dist/expression'
import  _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import { __command } from 'pareto-core/dist/__internals/async/command'
import { __command_promise } from 'pareto-core/dist/__internals/async/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { mkdir as fs_mkdir, writeFile as fs_writeFile } from "fs"
import * as t_path_to_text from "../path_to_text"

export const $$: resources.commands.write_file = __command((
    $p,
) => {
    return __command_promise({
        'execute': (on_success, on_error) => {

            fs_mkdir(
                t_path_to_text.Context_Path($p.path.context),
                {
                    'recursive': true
                },
                (err, path) => {
                    if (err) {
                        on_error(_p.state.block(() => {
                            if (err.code === 'EACCES' || err.code === 'EPERM') {
                                return ['permission denied', null]
                            }
                            throw new Error(`unhandled fs.writeFile error code: ${err.code}`)
                        }))
                        return
                    }
                    fs_writeFile(
                        t_path_to_text.Node_Path($p.path),
                        _p_text_from_list($p.data, ($) => $),
                        (err) => {
                            if (err) {
                                on_error(_p.state.block(() => {
                                    if (err.code === 'EACCES' || err.code === 'EPERM') {
                                        return ['permission denied', null]
                                    }
                                    throw new Error(`unhandled fs.writeFile error code: ${err.code}`)
                                }))
                            } else {
                                on_success()
                            }
                        }
                    )
                }
            )
        }
    })
})
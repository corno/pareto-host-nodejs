import p_change_context from 'pareto-core/dist/implementation/specials/change_context'

import command from 'pareto-core/dist/implementation/command/command'
import command_promise from 'pareto-core/dist/implementation/command/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { rm as fs_rm } from "fs"
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"


export const $$: resources.filesystem_unrestricted.commands.remove = command(
    ($p) =>  command_promise({
        'execute': (on_success, on_error) => {
            fs_rm(
                t_path_to_text.Context_Path($p.path),
                {
                    'recursive': true,
                },
                (err) => {

                    if (err) {
                        if (err.code === 'ENOENT' && !$p['error if not exists']) {
                            on_success()
                        } else {
                            on_error({
                                'path': $p.path,
                                'type': p_change_context(null, () => {
                                    if (err.code === 'ENOENT') {
                                        return ['node does not exist', null]
                                    }
                                    if (err.code === 'EACCES' || err.code === 'EPERM') {
                                        return ['permission denied', null]
                                    }
                                    // if (err.code === 'EISDIR' || err.code === 'ENOTDIR') {
                                    //     return ['node is not a directory', null]
                                    // }
                                    // if (err.code === 'ERR_FS_EISDIR') {
                                    //     return ['node is a directory', null]
                                    // }
                                    throw new Error(`unhandled fs.rm error code: ${err.code}`)
                                })
                            })
                        }
                    } else {
                        on_success()
                    }
                }
            )
        }
    })
)
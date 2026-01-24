import * as _pc from 'pareto-core/dist/command'
import * as _pr from 'pareto-core/dist/refiner'

import { __command } from 'pareto-core/dist/__internals/async/command'
import { __command_promise } from 'pareto-core/dist/__internals/async/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { rm as fs_rm } from "fs"
import * as s_path from "pareto-resources/dist/implementation/manual/schemas/path/serializers"


export const $$: resources.commands.remove = __command((
    $p,
) => {
    return __command_promise({
        'execute': (on_success, on_error) => {
            fs_rm(
                s_path.Node_Path($p.path),
                {
                    'recursive': true,
                },
                (err) => {

                    if (err) {
                        if (err.code === 'ENOENT' && !$p['error if not exists']) {
                            on_success()
                        } else {
                            on_error(_pr.state.block(() => {
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
                                return _pr.fixme_abort(`unhandled fs.rm error code: ${err.code}`)
                            }))
                        }
                    } else {
                        on_success()
                    }
                }
            )
        }
    })
})
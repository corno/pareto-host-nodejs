import * as _pc from 'pareto-core-command'
import * as _pinternals from 'pareto-core-internals'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { rm as fs_rm } from "fs"
import * as s_path from "pareto-resources/dist/implementation/manual/schemas/path/serializers"


export const $$: resources.commands.remove = _pc.__create_resource_command((
    $p,
) => {
    return _pc.__create_command_promise({
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
                            on_error(_pinternals.block(() => {
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
                                return _pinternals.panic(`unhandled fs.rm error code: ${err.code}`)
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
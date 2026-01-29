import * as _pc from 'pareto-core/dist/command'
import * as _pr from 'pareto-core/dist/refiner'

import { __command } from 'pareto-core/dist/__internals/async/command'
import { __command_promise } from 'pareto-core/dist/__internals/async/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { cp as fs_cp } from "fs"
import * as s_path from "pareto-resources/dist/implementation/manual/schemas/path/serializers"

export const $$: resources.commands.copy = __command((
    $p,
) => {
    return __command_promise({
        'execute': (on_success, on_error) => {
            const options: any = {}
            $p.options.recursive.__o_map(($) => { options.recursive = $ })
            $p.options.force.__o_map(($) => { options.force = $ })
            $p.options.errorOnExist.__o_map(($) => { options.errorOnExist = $ })

            fs_cp(
                s_path.Node_Path($p.source),
                s_path.Node_Path($p.target),
                options,
                (err) => {
                    if (err) {
                        on_error(_pr.state.block(() => {
                            if (err.code === 'ENOENT') {
                                return ['source does not exist', null]
                            }
                            if (err.code === 'EACCES' || err.code === 'EPERM') {
                                return ['permission denied', null]
                            }
                            if (err.code === 'EISDIR' || err.code === 'ERR_FS_EISDIR') {
                                return ['node is not a file', null]
                            }
                            if (err.code === 'EFBIG') {
                                return ['file too large', null]
                            }
                            if (err.code === 'EIO' || err.code === 'ENXIO') {
                                return ['device not ready', null]
                            }
                            throw new Error(`unhandled fs.cp error code: ${err.code}`)
                        }))
                    } else {
                        on_success()
                    }
                }
            )
        }
    })
})
import * as _pc from 'pareto-core-command'
import * as _pinternals from 'pareto-core-internals'

//interface
import * as resources from "exupery-resources/dist/interface/resources"

//dependencies
import { cp as fs_cp } from "fs"
import * as s_path from "exupery-resources/dist/implementation/serializers/schemas/path"

export const $$: resources.commands.copy = _pc.__create_resource_command((
    $p,
) => {
    return _pc.__create_command_promise({
        'execute': (on_success, on_error) => {
            const options: any = {}
            $p.options.recursive.map(($) => { options.recursive = $ })
            $p.options.force.map(($) => { options.force = $ })
            $p.options.errorOnExist.map(($) => { options.errorOnExist = $ })

            fs_cp(
                s_path.Node_Path($p.source),
                s_path.Node_Path($p.target),
                options,
                (err) => {
                    if (err) {
                        on_error(_pinternals.block(() => {
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
                            return _pinternals.panic(`unhandled fs.cp error code: ${err.code}`)
                        }))
                    } else {
                        on_success()
                    }
                }
            )
        }
    })
})
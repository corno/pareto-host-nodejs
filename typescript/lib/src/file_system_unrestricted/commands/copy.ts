import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import p_command from 'pareto-core/dist/implementation/command/__internal/command'
import p_command_promise from 'pareto-core/dist/implementation/command/__internal/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { cp as fs_cp } from "fs"
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"

export const $$: resources.filesystem_unrestricted.commands.copy = p_command(
    ($p) => p_command_promise({
        'execute': (on_success, on_error) => {
            const options: any = {}
            if ($p.options.recursive) {
                options.recursive = true
            }
            if ($p.options.force) {
                options.force = true
            }
            if ($p.options.errorOnExist) {
                options.errorOnExist = true
            }

            fs_cp(
                t_path_to_text.Node_Path($p.source),
                t_path_to_text.Node_Path($p.target),
                options,
                (err) => {
                    if (err) {
                        on_error({
                            'path': $p.source,
                            'type': p_change_context(null, () => {
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
                            })
                        })
                    } else {
                        on_success()
                    }
                }
            )
        }
    })
)
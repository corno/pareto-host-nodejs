import * as p_a from 'pareto-core/dist/assign'

import __command from 'pareto-core/dist/implementation/command/command'
import __command_promise from 'pareto-core/dist/implementation/command/command_promise'

//data types
import * as d from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_chmod/data"

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { chmod as fs_chmod } from "fs"
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"

function permissions_to_octal(permissions: d.Permissions): number {
    let value = 0
    if (permissions.read) {
        value += 4
    }
    if (permissions.write) {
        value += 2
    }
    if (permissions.execute) {
        value += 1
    }
    return value
}

export const $$: resources.filesystem_unrestricted.commands.chmod = __command((
    $p,
) => {
    return __command_promise({
        'execute': (on_success, on_error) => {
            // Convert permissions structure to numeric mode
            let mode = 0

            // Special bits (optional)

            $p.mode['special bits'].__extract_data(
                ($) => {
                    if ($.setuid) {
                        mode += 0o4000
                    }
                    if ($.setgid) {
                        mode += 0o2000
                    }
                    if ($.sticky) {
                        mode += 0o1000
                    }

                },
                () => {
                    // No special bits, do nothing
                }
            )
            if ($p.mode['special bits'] !== null) {
                const specialBits = $p.mode['special bits']
            }

            // Owner, group, others
            mode += permissions_to_octal($p.mode.owner) * 0o100
            mode += permissions_to_octal($p.mode.group) * 0o10
            mode += permissions_to_octal($p.mode.others) * 0o1

            fs_chmod(
                t_path_to_text.Node_Path($p.path),
                mode,
                (err) => {
                    if (err) {
                        on_error({
                            'path': $p.path,
                            'type': p_a.state.block(() => {
                                if (err.code === 'ENOENT') {
                                    return ['path does not exist', null]
                                }
                                if (err.code === 'EACCES' || err.code === 'EPERM') {
                                    return ['permission denied', null]
                                }
                                throw new Error(`unhandled fs.chmod error code: ${err.code}`)
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
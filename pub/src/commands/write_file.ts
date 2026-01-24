import * as _pc from 'pareto-core/dist/command'
import * as _pr from 'pareto-core/dist/refiner'

import { __command } from 'pareto-core/dist/__internals/async/command'
import { __command_promise } from 'pareto-core/dist/__internals/async/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { mkdir as fs_mkdir, writeFile as fs_writeFile } from "fs"
import * as s_path from "pareto-resources/dist/implementation/manual/schemas/path/serializers"

export const $$: resources.commands.write_file = __command((
    $p,
) => {
    return __command_promise({
        'execute': (on_success, on_error) => {

            fs_mkdir(
                s_path.Context_Path($p.path.context),
                {
                    'recursive': true
                },
                (err, path) => {
                    if (err) {
                        on_error(_pr.state_group.block(() => {
                            if (err.code === 'EACCES' || err.code === 'EPERM') {
                                return ['permission denied', null]
                            }
                            return _pr.fixme_abort(`unhandled fs.writeFile error code: ${err.code}`)
                        }))
                        return
                    }
                    fs_writeFile(
                        s_path.Node_Path($p.path),
                        $p.data,
                        (err) => {
                            if (err) {
                                on_error(_pr.state_group.block(() => {
                                    if (err.code === 'EACCES' || err.code === 'EPERM') {
                                        return ['permission denied', null]
                                    }
                                    return _pr.fixme_abort(`unhandled fs.writeFile error code: ${err.code}`)
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
import * as _pc from 'pareto-core-command'
import * as _pinternals from 'pareto-core-internals'

//interface
import * as resources from "exupery-resources/dist/interface/resources"

//dependencies
import { mkdir as fs_mkdir, writeFile as fs_writeFile } from "fs"
import * as s_path from "exupery-resources/dist/implementation/serializers/schemas/path"

export const $$: resources.commands.write_file = _pc.__create_resource_command((
    $p,
) => {
    return _pc.__create_command_promise({
        'execute': (on_success, on_error) => {

            fs_mkdir(
                s_path.Context_Path($p.path.context),
                {
                    'recursive': true
                },
                (err, path) => {
                    if (err) {
                        on_error(_pinternals.block(() => {
                            if (err.code === 'EACCES' || err.code === 'EPERM') {
                                return ['permission denied', null]
                            }
                            return _pinternals.panic(`unhandled fs.writeFile error code: ${err.code}`)
                        }))
                        return
                    }
                    fs_writeFile(
                        s_path.Node_Path($p.path),
                        $p.data,
                        (err) => {
                            if (err) {
                                on_error(_pinternals.block(() => {
                                    if (err.code === 'EACCES' || err.code === 'EPERM') {
                                        return ['permission denied', null]
                                    }
                                    return _pinternals.panic(`unhandled fs.writeFile error code: ${err.code}`)
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
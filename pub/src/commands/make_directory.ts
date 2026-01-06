import * as _pc from 'pareto-core-command'
import * as _pr from 'pareto-core-refiner'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { mkdir as fs_mkdir } from "fs"
import * as s_path from "pareto-resources/dist/implementation/manual/schemas/path/serializers"

export const $$: resources.commands.make_directory = _pc.__command((
    $p,
) => {
    return _pc.__command_promise({
        'execute': (on_success, on_error) => {
            fs_mkdir(
                s_path.Node_Path($p),
                {
                    'recursive': true,
                },
                (err, path) => {
                    if (err) {
                        on_error(_pr.state_group.block(() => {
                            if (err.code === 'EEXIST') {
                                return ['directory already exists', null]
                            }
                            return _pr.fixme_abort(`unhandled fs.mkdir error code: ${err.code}`)
                        }))
                    } else {
                        on_success()
                    }
                }
            )
        }
    })
})
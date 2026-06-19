import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'
import p_text_from_list from 'pareto-core/dist/implementation/transformer/specials/text_from_list'

import p_command from 'pareto-core/dist/implementation/command/__internal/command'
import p_command_promise from 'pareto-core/dist/implementation/command/__internal/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import { mkdir as fs_mkdir, writeFile as fs_writeFile } from "fs"
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"

export const $$: resources.filesystem_unrestricted.commands.write_file = p_command(
    ($p) => p_command_promise({
        'execute': (on_success, on_error) => {

            fs_mkdir(
                t_path_to_text.Context_Path($p.path.context),
                {
                    'recursive': true
                },
                (err, path) => {
                    if (err) {
                        on_error({
                            'path': $p.path,
                            'type': p_change_context(null, () => {
                                if (err.code === 'EACCES' || err.code === 'EPERM') {
                                    return ['permission denied', null]
                                }
                                throw new Error(`unhandled fs.writeFile error code: ${err.code}`)
                            })
                        })
                        return
                    }
                    fs_writeFile(
                        t_path_to_text.Node_Path($p.path),
                        p_text_from_list($p.data, ($) => $),
                        (err) => {
                            if (err) {
                                on_error({
                                    'path': $p.path,
                                    'type': p_change_context(null, () => {
                                        if (err.code === 'EACCES' || err.code === 'EPERM') {
                                            return ['permission denied', null]
                                        }
                                        throw new Error(`unhandled fs.writeFile error code: ${err.code}`)
                                    })
                                })
                            } else {
                                on_success()
                            }
                        }
                    )
                }
            )
        }
    })
)
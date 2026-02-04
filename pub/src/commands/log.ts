import * as _pc from 'pareto-core/dist/command'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/schemas/block/transformers/text"

import { __command } from 'pareto-core/dist/__internals/async/command'
import { __command_promise } from 'pareto-core/dist/__internals/async/command_promise'

export const $$: resources.commands.log = __command((
    $p,
) => {
    return __command_promise({
        'execute': (on_success) => {
            process.stdout.write(
                _p_text_from_list(
                    t_fp_to_text.Block_Part(
                        $p.messsage,
                        {
                            'indentation': '    ',
                            'newline': '\n',
                        }
                    ),
                    ($) => $
                )
            )
            on_success()
        }
    })
})
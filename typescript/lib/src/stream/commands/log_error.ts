import * as _pc from 'pareto-core/dist/command'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import __command from 'pareto-core/dist/__internals/async/command'
import __command_promise from 'pareto-core/dist/__internals/async/command_promise'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

//dependencies
import * as t_fp_to_list_of_characters from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/list_of_characters"

export const $$: resources.commands.stream_log_error = __command((
    $p,
) => {
    return __command_promise({
        'execute': (on_success) => {
            process.stderr.write(
                _p_text_from_list(
                    t_fp_to_list_of_characters.Paragraph(
                        $p.message,
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
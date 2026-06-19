import p_text_from_list from 'pareto-core/dist/implementation/specials/text_from_list'

//interface
import * as resources from "pareto-stream/dist/interface/commands"

//dependencies
import * as t_fp_to_list_of_characters from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/list_of_characters"

import p_command from 'pareto-core/dist/implementation/command/command'
import p_command_promise from 'pareto-core/dist/implementation/command/command_promise'

export const $$: resources.commands.log = p_command(
    ($p) => p_command_promise({
        'execute': (on_success) => {
            process.stdout.write(
                p_text_from_list(
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
)
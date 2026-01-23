import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/transformer'

import * as d_terminal_output from "pareto-resources/dist/interface/generated/liana/schemas/terminal_output/data"

export const Message = ($: string): d_terminal_output.Message => {
    return {
        'raw': $,
        'lines': _p.list.literal($.split("\n")),
    }
}
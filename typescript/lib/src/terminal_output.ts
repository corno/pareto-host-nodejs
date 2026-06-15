import * as p_a from 'pareto-core/dist/assign'

import * as d_terminal_output from "pareto-resources/dist/interface/generated/liana/schemas/terminal_output/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Message = ($: string): d_terminal_output.Message => {
    return {
        'raw': $,
        'lines': p_a.literal.list($.split("\n")),

    }
}
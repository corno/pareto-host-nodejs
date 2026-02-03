
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/path/data"

import * as t_path_to_text from "pareto-resources/dist/implementation/manual/schemas/path/transformers/text"


export function Context_Path($: d_path.Context_Path): string {
    return _p_text_from_list(
        t_path_to_text.Context_Path($),
        ($) => $,
    )
}

export function Node_Path($: d_path.Node_Path): string {
    return _p_text_from_list(
        t_path_to_text.Node_Path($),
        ($) => $,
    )
}
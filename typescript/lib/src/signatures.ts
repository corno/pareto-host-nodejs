import * as p_ci from 'pareto-core/interface/command'

import * as d_main from "pareto-resources/interface/data/temp_main"

export type main = (
    get_main: () => p_ci.Command<d_main.Error, d_main.Parameters>,
) => undefined

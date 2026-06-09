import * as _pi from 'pareto-core/dist/interface'

import * as d_filesystem_unrestricted from "./file_system_unrestricted/signatures"
import * as d_filesystem_stream from "./stream/signatures"
import * as d_execute_unrestricted from "./execute_unrestricted/signatures"

import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"

export type Available_Standard_Resources = {
    'filesystem unrestricted': d_filesystem_unrestricted.Resources
    'stream': d_filesystem_stream.Resources
    'execute unrestricted': d_execute_unrestricted.Resources
}

export type main = (
    get_main: ($r: Available_Standard_Resources) => _pi.Command<d_main.Error, d_main.Parameters>,
) => void

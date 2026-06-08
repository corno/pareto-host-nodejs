import * as _pi from 'pareto-core/dist/interface'
import __command from 'pareto-core/dist/__internals/async/command'


export const __create_command = <
    Error,
    Command_Parameters,
    Creator_Parameters,
>(
    command_creator: (parameters: Creator_Parameters) => ($p: Command_Parameters) => _pi.Command_Promise<Error>
): ($x: Creator_Parameters) => _pi.Command<Error, Command_Parameters> => {
    return ($x: Creator_Parameters) => __command<Error, Command_Parameters>(
        command_creator($x)
    )
}

export type Command_Creator<Error, Parameters, Creator_Parameters> = (
    $x: Creator_Parameters
) => _pi.Command<Error, Parameters>

export type Query_Creator<Output, Error, Parameters, Creator_Parameters> = (
    $x: Creator_Parameters
) => _pi.Query<Output, Error, Parameters>

export type Resource_Collection<Commands, Queries> = {
    'commands': Commands,
    'queries': Queries,
}
import * as p_temp from '../temp_core'

import * as resources from "pareto-resources/dist/interface/resources"

export type Resources = p_temp.Resource_Collection<
        {
            'command executable': resources.execute_unrestricted.commands.command_executable
            'smelly command executable': resources.execute_unrestricted.commands.smelly_command_executable

        },
        {
            'query executable': resources.execute_unrestricted.queries.query_executable
        }
>
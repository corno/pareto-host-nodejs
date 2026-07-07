import * as p_ from 'pareto-core/interface/resource'

import * as resources from "pareto-resources/interface/resources"

export type Resources = p_.Resource<
        {
            'command executable': resources.execute_unrestricted.commands.command_executable
            'smelly command executable': resources.execute_unrestricted.commands.smelly_command_executable

        },
        {
            'query executable': resources.execute_unrestricted.queries.query_executable
        }
>
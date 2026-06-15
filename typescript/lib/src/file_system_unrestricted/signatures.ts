import * as p_temp from '../temp_core'

import * as resources from "pareto-resources/dist/interface/resources"


export type Resources = p_temp.Resource_Collection<
    {
        'chmod': resources.filesystem_unrestricted.commands.chmod
        'copy': resources.filesystem_unrestricted.commands.copy
        'make directory': resources.filesystem_unrestricted.commands.make_directory
        'remove': resources.filesystem_unrestricted.commands.remove
        'write file': resources.filesystem_unrestricted.commands.write_file

    },
    {
        'read directory': resources.filesystem_unrestricted.queries.read_directory
        'read file': resources.filesystem_unrestricted.queries.read_file
        // 'stat': resources.filesystem_unrestricted.queries.stat
        'stat possible node': resources.filesystem_unrestricted.queries.stat_possible_node
    }
>
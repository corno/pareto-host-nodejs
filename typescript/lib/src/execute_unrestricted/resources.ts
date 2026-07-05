import { type Resources } from "./signatures"

import { $$ as p_execute_command_executable } from "./commands/command_executable"
import { $$ as p_execute_smelly_command_executable } from "./commands/smelly_command_executable"
import { $$ as q_execute_query_executable } from "./queries/query_executable"

export const $: Resources = {
    'commands': {
        'command executable': p_execute_command_executable,
        'smelly command executable': p_execute_smelly_command_executable,

    },
    'queries': {
        'query executable': q_execute_query_executable,
    }
}
import { type Resources } from "./signatures"

import { $$ as p_fs_unrestricted_chmod } from "./commands/chmod"
import { $$ as p_fs_unrestricted_copy } from "./commands/copy"
import { $$ as p_fs_unrestricted_make_directory } from "./commands/make_directory"
import { $$ as p_fs_unrestricted_remove } from "./commands/remove"
import { $$ as p_fs_unrestricted_write_file } from "./commands/write_file"

import { $$ as q_fs_unrestricted_read_directory } from "./queries/read_directory"
import { $$ as q_fs_unrestricted_read_file } from "./queries/read_file"
// import { $$ as q_fs_unrestricted_stat } from "./queries/stat"
import { $$ as q_fs_unrestricted_stat_possible_node } from "./queries/stat_possible_node"

export const $: Resources = {
    'commands': {
        'chmod': p_fs_unrestricted_chmod,
        'copy': p_fs_unrestricted_copy,
        'make directory': p_fs_unrestricted_make_directory,
        'remove': p_fs_unrestricted_remove,
        'write file': p_fs_unrestricted_write_file,

    },
    'queries': {
        'read directory': q_fs_unrestricted_read_directory,
        'read file': q_fs_unrestricted_read_file,
        // 'stat': q_fs_unrestricted_stat,
        'stat possible node': q_fs_unrestricted_stat_possible_node,
    }
}
import * as p_i from 'pareto-core/dist/interface'

export type Resource_Collection<Commands, Queries> = {
    'commands': Commands,
    'queries': Queries,
}
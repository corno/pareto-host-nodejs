import * as p_ from 'pareto-core/implementation/query'

import p_query from 'pareto-core/implementation/query/__internal/query'
import p_query_result from 'pareto-core/implementation/query/__internal/query_result'

//interface
import * as resources from "pareto-stream/interface/queries"

export const $$: resources.queries.get_instream_data = p_query((
) => {
    return p_query_result((on_value) => {

        const stdin = process.stdin;
        let data = '';
        stdin.setEncoding('utf8');

        stdin.on('data', (chunk: string) => {
            data += chunk;
        });

        stdin.on('end', () => {
            on_value(data);
        });

        stdin.resume();
    })
})
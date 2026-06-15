import * as p_q from 'pareto-core/dist/implementation/query'

import __query from 'pareto-core/dist/implementation/query/query'
import query_result from 'pareto-core/dist/implementation/query/query_result'

//interface
import * as resources from "pareto-stream/dist/interface/queries"

export const $$: resources.queries.get_instream_data = __query((
) => {
    return query_result((on_value) => {

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
import * as p_q from 'pareto-core/dist/query/implementation'

import __query from 'pareto-core/dist/query/implementation/query'
import __query_result from 'pareto-core/dist/query/implementation/__query_result'

//interface
import * as resources from "pareto-stream/dist/interface/queries"

export const $$: resources.queries.get_instream_data = __query((
) => {
    return __query_result((on_value) => {

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
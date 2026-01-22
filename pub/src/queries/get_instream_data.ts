import * as _pq from 'pareto-core/dist/query'

import { __query } from 'pareto-core/dist/query/query'
import { __query_result } from 'pareto-core/dist/query/query_result'

//interface
import * as resources from "pareto-resources/dist/interface/resources"

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
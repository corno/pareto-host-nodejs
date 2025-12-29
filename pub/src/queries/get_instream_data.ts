import * as _pq from 'pareto-core-query'

//interface
import * as resources from "exupery-resources/dist/interface/resources"

export const $$: resources.queries.get_instream_data = _pq.__create_query((
) => {
    return _pq.__create_query_result((on_value) => {

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
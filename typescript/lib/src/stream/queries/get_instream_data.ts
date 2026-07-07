
import * as p_ from 'pareto-core/implementation/resource'

//interface
import * as resources from "pareto-stream/interface/queries"

export const $$: resources.queries.get_instream_data = p_.query(($p, on_value) => {

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
import {ApolloProvider} from '@apollo/client';
import ReactDOM from 'react-dom';

import {client} from './client';
import {MyComponent} from "./MyComponent";

ReactDOM.render(
    <ApolloProvider client={client}>
        <MyComponent/>
    </ApolloProvider>,
    document.body
);

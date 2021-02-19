import {ApolloClient, InMemoryCache, gql} from "@apollo/client";
import typeDefs from './schema.graphqls'

const typePolicies = {
    Query: {
        fields: {
            organization: {
                read: () => {
                    // I would expect that returning `undefined` allows the query to continue to the resolver. This
                    // seems to be true, but if it resolves with `null` then the `data` returned from `useQuery`
                    // returns undefined. If we don't have a type policy, then we correctly see `{ organization: null }`.
                    return;
                }
            }
        }
    }
};

export const client = new ApolloClient({
    cache: new InMemoryCache({typePolicies}),
    resolvers: {
        Query: {
            member: () => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({
                            id: 'me',
                            fullName: 'Drew Walker',
                            __typename: 'Member',
                            // We're resolving with an organization under the member so that it ends up in the cache.
                            organization: {
                                id: 'abc123',
                                __typename: 'Organization'
                            }
                        })
                    }, 2000);
                })
            },
            organization: () => {
                // We're resolving with a `null` organization to replicate a scenario where you can't access the org.
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(null)
                    }, 2000)
                })
            }
        }
    },
    typeDefs,
    connectToDevTools: true
});

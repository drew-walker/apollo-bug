import {gql, useQuery} from "@apollo/client";

export const MyComponent = () => {
    // Fetch the member first just to hydrate the cache with the `member:me` and `organization:abc123`
    const {loading} = useQuery(gql`query ($memberID: ID!) {
        member(id: $memberID) @client {
            id
            fullName
            organization {
                id
            }
        }
    }`, {
        variables: {
            "memberID": "me"
        }
    });

    // Fetch the org after the member has loaded.
    const {data: orgData, loading: orgLoading} = useQuery(gql`query ($orgID: ID!) {
        organization(id: $orgID) @client {
            id
            displayName
        }
    }`, {
        variables: {
            "orgID": "abc123"
        },
        skip: loading
    })

    // This ends up being undefined even after we resolve with `null`.
    console.log(orgData);

    return loading || orgLoading ? 'Loading...' : 'DONE!';
}

import '@/styles/globals.css'
import type { AppType } from 'next/app'
import { Provider, Client, fetchExchange } from 'urql';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';

import Layout from '@/components/layout';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '@/gql/graphql';

const updateQuery = <Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) => {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
};

const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange({
    updates: {
      Mutation: {
        login: (_result, args, cache, info) => {
          updateQuery<LoginMutation, MeQuery>(
            cache, 
            { query: MeDocument.toString() },
            _result,
            (result, query) => {
              if (result.login.errors) {
                return query;
              } else {
                return { me: result.login.user, };
              }
            }
          );
        },
        register: (_result, args, cache, info) => {
          updateQuery<RegisterMutation, MeQuery>(
            cache, 
            { query: MeDocument.toString() },
            _result,
            (result, query) => {
              if (result.register.errors) {
                return query;
              } else {
                return { me: result.register.user, };
              }
            }
          );
        },
        logout: (_result, args, cache, info) => {
          updateQuery<LogoutMutation, MeQuery>(
            cache, 
            { query: MeDocument.toString() },
            _result,
            () => ({ me: null })
          );
        },
      }
    }
  }), fetchExchange],
  fetchOptions: {
    credentials: 'include',
  }
});

const App: AppType = ({ Component, pageProps }) => {
  return (
    <Provider value={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App; 
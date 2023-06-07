import '@/styles/globals.css'
import type { AppType } from 'next/app'
import { Provider, Client, cacheExchange, fetchExchange } from 'urql';

import Layout from '@/components/layout';

const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
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
import React, { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const Provider = (props:iProps) => {
  const { children } = props;

  return (<ApolloProvider client={client}>{children}</ApolloProvider>);
};

export default Provider;

interface iProps {
  children: ReactNode,
}

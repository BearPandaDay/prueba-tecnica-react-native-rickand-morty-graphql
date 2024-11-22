import React from 'react';
import { Text, FlatList, Image, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

const GET_CHARACTERS = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        image
      }
    }
  }
`;

const Characters = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data.characters.results}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
};

export default Characters;

import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/queries';

const CharactersList = (props:iProps) => {
  const { navigation } = props;
  const [page, setPage] = useState(1);
  console.log('🚀 ~ CharactersList ~ setPage:', setPage);

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) {
    return (<Text>Cargando...</Text>);
  }
  if (error) {
    return (
      <Text>Error: {error.message}</Text>
    );
  }

  const loadMoreCharacters = () => {
    if (data.characters.info.next) {
      fetchMore({
        variables: { page: data.characters.info.next },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {return (prev);}

          return {
            characters: {
              ...fetchMoreResult.characters,
              results: [
                ...prev.characters.results,
                ...fetchMoreResult.characters.results,
              ],
            },
          };
        },
      });
    }
  };

  const renderItem = ({ item }) => (

    <TouchableOpacity
      style={styles.characterCard}
      onPress={() =>
        navigation.navigate('CharacterDetails', {
          characterId: item.id,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.characterImage} />
      <View>
        <Text style={styles.characterName}>{item.name}</Text>
        <Text style={styles.characterStatus}>Estado: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={{backgroundColor: '#383838',}}
      data={data.characters.results}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onEndReached={loadMoreCharacters}
      onEndReachedThreshold={0.5}
      contentContainerStyle={styles.listContainer}
    />
    // <></>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  characterCard: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#151515',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  characterStatus: {
    fontSize: 14,
    color: '#555',
  },
});

export {
  CharactersList,
};


interface iProps {
  navigation: any,
}

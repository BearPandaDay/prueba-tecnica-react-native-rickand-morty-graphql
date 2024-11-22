import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER_DETAILS } from '../graphql/queries';

const CharacterDetails = ({ route }) => {
  const { characterId } = route.params;

  const { data, loading, error } = useQuery(GET_CHARACTER_DETAILS, {
    variables: { id: characterId },
  });

  if (loading) {return <Text>Cargando detalles...</Text>};
  if (error) {return <Text>Error: {error.message}</Text>};


  const { name, image, status, origin, episode } = data.character;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.characterImage} />
      <Text style={styles.characterName}>{name}</Text>
      <Text style={styles.characterStatus}>Estado: {status}</Text>
      <Text style={styles.characterOrigin}>Origen: {origin.name}</Text>
      <Text style={styles.episodesTitle}>Episodios:</Text>
      <FlatList
        data={episode}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.episodeName}>• {item.name}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  characterImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  characterStatus: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  characterOrigin: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  episodesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  episodeName: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CharacterDetails;

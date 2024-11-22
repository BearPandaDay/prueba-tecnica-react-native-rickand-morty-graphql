import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient'; // Importa ApolloClient
import CharactersList from './screens/CharactersList';
import CharacterDetails from './screens/CharacterDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName="CharactersList">
            <Stack.Screen name="CharactersList" component={CharactersList} />
            <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;

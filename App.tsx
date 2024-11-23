import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/context/ApolloClient'; // Importa ApolloClient
import {CharactersList} from './src/screens/CharactersList';
import {CharacterDetails} from './src/screens/CharacterDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaView style={style.safeAreaView}>
          <Stack.Navigator screenOptions={{
            headerTintColor: '#ffffff',
            headerTitleStyle: {fontWeight: 'bold'},
            headerStyle: {backgroundColor: '#383838',
            }}} initialRouteName="CharactersList">
            <Stack.Screen name="CharactersList" component={CharactersList} />
            <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;


const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#383838',
  },
});

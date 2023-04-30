import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './src/telas/HomePage';
import LoginPage from './src/telas/LoginPage';
import RegisterPage from './src/telas/RegisterPage';

const tema = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  const Stack = createStackNavigator();
  return (
      <View style={{flex: 1, alignContent: "center"}}>
        <NavigationContainer theme={tema}>
         <Stack.Navigator mode="modal">
           <Stack.Screen name="Chain" component={LoginPage}/>
           <Stack.Screen name="Cadastro" component={RegisterPage}/>
           <Stack.Screen name="Home" component={HomePage}/>
         </Stack.Navigator>
        </NavigationContainer>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

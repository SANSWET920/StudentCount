
import React from 'react';
import { Button, View, Text, SafeAreaView, StatusBar } from 'react-native';
import 'react-native-gesture-handler'

import MainRouter from "./navigation/tabs"
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

  return (
    <NavigationContainer>
    <MainRouter />
    </NavigationContainer>
  );
}

export default App;


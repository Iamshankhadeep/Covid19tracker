import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/homeScreen';
import FaqScreen from './components/faqScreen';
import HelpfulScreen from './components/helpfulScreen'
import Constants from 'expo-constants';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="StateWise" component={HomeScreen} />
      <Tab.Screen name="Helpful links" component={HelpfulScreen} />
      <Tab.Screen name="FAQ" component={FaqScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapPage  from "./Components/MapPage";
import MapView from 'react-native-maps';

export default function App() {
  return (
    <View style={styles.container}>
      
      <MapPage></MapPage>
      <Text>data</Text>
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

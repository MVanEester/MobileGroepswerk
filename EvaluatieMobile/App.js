import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapPage  from "./Components/MapPage";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

const Map = () => {
  return (
    <View>
      <Text>dit is de map....</Text>
    </View>
  );
}

const Lijst = () => {
  return (
    <View>
      <Text>dit is de lijst....</Text>
    </View>
  );
}

const Fav = () => {
  return (
    <View>
      <Text>dit zijn de Favorieten....</Text>
    </View>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name="Map" 
            component={MapPage}
            options={{tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="map" size={24} color="black" />
              )}
            } 
          />
          <Tab.Screen 
            name="Lijst" 
            component={Lijst}
            options={{tabBarIcon: ({color, size}) => (
              <FontAwesome name="list-ul" size={24} color="black" />
              )}
            } 
          />
          <Tab.Screen 
            name="Favorieten" 
            component={Fav}
            options={{tabBarIcon: ({color, size}) => (
              <FontAwesome name="star" size={24} color="black" />
              )}
            } 
          />
        </Tab.Navigator>
      </NavigationContainer>
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

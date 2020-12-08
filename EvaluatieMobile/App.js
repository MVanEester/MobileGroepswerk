import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapPage  from "./Components/MapPage";
import ListPage  from "./Components/ListPage";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createBottomTabNavigator();

const GetApiData = async () => {
  try {
    fetch('https://opendata.arcgis.com/datasets/99c7168df28142958cbfec31cd633d56_289.geojson')
    .then((response) => response.json())
    .then((json) => {
      let features = [];
      json.features.map(feature => {
        console.log();
        features.push({
          key: feature.properties.OBJECTID,
          title: feature.properties.Straat,
          address: feature.properties.Adres,
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0]
        })
      });
      const jsonValue = JSON.stringify(features)
      AsyncStorage.setItem('@api_data', jsonValue)
    })
    .catch((error) => {
      console.error(error);
    });
  
  } catch (e) {
    console.error(e);
  }
}

GetApiData();

const Fav = () => {
  return (
    <View>
      <Text>dit zijn de Favorieten....</Text>
    </View>
  );
}

export default function App() {
  const [data, setData] = useState([]);

  const loadAsyncData = async () => {
    try {
    const jsonValue = await AsyncStorage.getItem('@api_data')
    setData(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch(e) {
    // error reading value
    }
  }    

  useEffect(() => {
    loadAsyncData();
  }, [data]);
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name="Map" 
            children={() => (
              <MapPage data={data}/>
            )}
            options={{tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="map" size={24} color="black" />
              )}
            } 
          />
          <Tab.Screen 
            name="Lijst" 
            children={() => (
              <ListPage data={data}/>
            )}
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

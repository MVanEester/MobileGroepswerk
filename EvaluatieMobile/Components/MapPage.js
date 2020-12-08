import React, { useEffect, useState } from 'react';
import MapView, { Marker, annotations } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const MapPage = (props) => {
  const [data, setData] = useState([]);

  const loadAsyncData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@api_data')
      setData(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    loadAsyncData();
  }, [data]);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        mapType="satellite"
        initialRegion={{
          latitude: 51.2127037,
          longitude: 4.409325,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {data.map(marker => (
          <MapView.Marker
            key={marker.key}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
          />
        ))}

      </MapView>

    </View>
  );
}

export default MapPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    flex: 1, width: 350
  },
});

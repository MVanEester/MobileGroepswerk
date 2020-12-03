import React, { useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const getData = () => {
   fetch('https://opendata.arcgis.com/datasets/99c7168df28142958cbfec31cd633d56_289.geojson')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.error(error);
    });
};
// jsondata = getData();
// console.log(jsondata);

const MapPage = () => {
  useEffect(() => {
    let jsondata = getData();
  }, []);
  return (
    <View style={styles.container}>
        <MapView
            style={styles.mapStyle}
            initialRegion={{
                latitude: 50.814604,
                longitude: 4.386932,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
        />
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

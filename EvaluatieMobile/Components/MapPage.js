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
  let jsondata;
  useEffect(() => {
    jsondata = getData();
  }, []);

  var markers = jsondata.features.map(feature => {
    feature.geometry.coordinates[0]
    feature.geometry.coordinates[1]
  })
  return (
    <View style={styles.container}>
        <MapView
            style={styles.mapStyle}
            initialRegion={{
                latitude: 51.2127037,
                longitude: 4.409325,
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

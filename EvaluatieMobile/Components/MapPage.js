import React, { useEffect, useState } from 'react';
import MapView, { Marker, annotations } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,  } from 'react-native';

const getData = () => {
   fetch('https://opendata.arcgis.com/datasets/99c7168df28142958cbfec31cd633d56_289.geojson')
    .then(response => response.json())
    .then((json) => {
      console.log(json);
      return json
    })
    .catch((error) => {
      console.error(error);
    });
};
// jsondata = getData();
// console.log(jsondata);

const MapPage = () => {
  const [markers, setMarkers] = useState([]);
  // let markers = [];
  useEffect(() => {
    fetch('https://opendata.arcgis.com/datasets/99c7168df28142958cbfec31cd633d56_289.geojson')
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
      let marker = []
      json.features.map(feature => {
        console.log();
        marker.push({
          key: feature.properties.OBJECTID,
          title: feature.properties.NAAM,
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0]
        })
      });
      setMarkers(marker);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
  // console.log("marker: ",markers);

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
            {markers.map(marker => (
               <MapView.Marker 
                 key={marker.key}
                 coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
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

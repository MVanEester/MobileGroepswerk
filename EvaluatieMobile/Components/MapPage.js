import React, { useEffect, useState } from 'react';
import MapView, { Marker, annotations } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,  } from 'react-native';

const MapPage = (props) => {
  const [markers, setMarkers] = useState([]);
  useEffect(()=>{
    setMarkers(props.data)
  }, [])
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

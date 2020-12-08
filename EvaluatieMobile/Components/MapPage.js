import React, { useEffect, useState} from 'react';
import MapView, { Marker, annotations } from 'react-native-maps';
import { StyleSheet, Text, View, Modal,TouchableHighlight, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const MapPage = (props) => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

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
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              style={{ ...styles.closeButton, backgroundColor: "#FF0000" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>X</Text>
            </TouchableHighlight>
            <Text style={styles.modalText}>{modalData.title}</Text>
            <Text style={styles.modalText}>{modalData.address}</Text>
            <TouchableHighlight
              style={{ ...styles.detailButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                navigation.navigate('DetailPage', {data: feature})
              }}
            >
              <Text style={styles.textStyle}>Detail</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
                 coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                //  title={marker.title} 
                 onPress={() => {
                  setModalVisible(!modalVisible);
                  setModalData(marker);
                }}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 390
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 110,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  detailButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    elevation: 2
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
    borderRadius: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  } 
});

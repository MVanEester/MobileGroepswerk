import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailPage from "./DetailPage";
import CameraPage from "./CameraPage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const Stack = createStackNavigator();

const MapPage = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="buurtfietsenstallingen"
        component={Map}
       />
      <Stack.Screen
        name="Detail"
        component={DetailPage}
      />
      <Stack.Screen
        name="Camera"
        component={CameraPage}
      />
    </Stack.Navigator>
  );
}

const Map = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [currentLocation, setLocation] = useState([null]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [load, setLoad] = useState(true);

  const loadAsyncData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@api_data')
      setData(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      // error reading value
    }
  }

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    setLoad(false)
  }

  let navigation = useNavigation();

  useEffect(() => {
    loadAsyncData();
    getLocation();
  }, [data]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (currentLocation) {
    text = JSON.stringify(currentLocation);
  }

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
            <MaterialCommunityIcons name="bike" size={24} color="black" />
            <TouchableHighlight

              style={{ ...styles.closeButton, backgroundColor: "#FF0000" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>X</Text>
            </TouchableHighlight>
            <Text></Text>
            <Text style={styles.modalText}>{modalData.title}</Text>
            <Text style={styles.modalText}>{modalData.address}</Text>
            <TouchableHighlight
              style={{ ...styles.detailButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                navigation.navigate('Detail', { data: modalData });
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Detail</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      { load ? <Text>loading...</Text> : 
        <MapView
          style={styles.mapStyle}
          mapType="satellite"
          initialRegion={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {data.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              //  title={marker.title} 
              onPress={() => {
                setModalVisible(!modalVisible);
                setModalData(marker);
              }}
            />
          ))}
          <Marker
            key="Eigen Locatie"
            coordinate={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }}
            title="Eigen Locatie"
            description="U bevindt zich hier."
          />
        </MapView>
      }
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
    margin: 1,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
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
    marginBottom: 10,
    textAlign: "left",

  }
});

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

export default function CameraPage({route}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [load, setLoad] = useState(false)
  let navigation = useNavigation();
  const feature = route.params.data;
  let camera;
  const takePicture = async() => {
      try {
        let picture = await camera.takePictureAsync()
        console.log(picture.uri);
        console.log(`${FileSystem.documentDirectory}${feature.key}`);
        await FileSystem.moveAsync({from: picture.uri, to: `${FileSystem.documentDirectory}${feature.key}.jpg`})
        console.log("picture moved");
        navigation.goBack()
      } catch (error) {
          console.log(error);
      }
    }
    
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={camera}  ref={ref => {camera = ref;}}/>
      {load ?
        <Button title="Saving..."/>:
        <Button title="Neem een foto"onPress={x => {takePicture(); setLoad(true)}} />
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });
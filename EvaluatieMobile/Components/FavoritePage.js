import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import DetailPage from "./DetailPage";
import CameraPage from "./CameraPage";


const Stack = createStackNavigator();

const FavoritePage = (navigation, props, route) => {
  const [data, setData] = useState([]);

  const loadAsyncData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorites')
      setData(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    loadAsyncData();
  }, [data]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="buurtfietsenstallingen"
        children={() => (
          <ScrollDetail/>
        )} />
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

const ScrollDetail = (props) => {
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState(true)
  const loadAsyncData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorites')
      setData(jsonValue != null ? JSON.parse(jsonValue) : null);
      
      if (jsonValue != null) {
        setNotFound(false)
      }
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    loadAsyncData();
  }, [data]);

  let navigation = useNavigation();

  return (
    <View>
      <ScrollView>
        {notFound ?
        <Text style={styles.textStyle}>Geen favorieten gevonden.</Text>:
        (data.map((feature) => {
          return (<View key={feature.key} style={{ marginTop: 2 }}>
            <Button title={feature.title} onPress={() => navigation.navigate('Detail', { data: feature })}>{feature.address}</Button>
          </View>
          )
        }))}
      </ScrollView>
    </View>
  );
}

export default FavoritePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailStyle: {
    paddingLeft: 5,
  },

  itemStyle: {
    fontWeight: "bold",
  },

  textStyle: {
    textAlign: 'center',
    margin: 100,
  },
});

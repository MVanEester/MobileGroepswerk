import React, { useEffect, useState } from 'react';
import { View, ScrollView, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import DetailPage from "./DetailPage";
import CameraPage from "./CameraPage";

const Stack = createStackNavigator();

const ListPage = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="buurtfietsenstallingen"
        component={ScrollDetail}
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

const ScrollDetail = () => {
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

  let navigation = useNavigation();

  return (
    <View>
      <ScrollView>
        {data.map((feature) => {
          return (<View key={feature.key} style={{ marginTop: 2 }}>
            <Button title={feature.title} onPress={() => navigation.navigate('Detail', { data: feature })}>{feature.address}</Button>
          </View>
          )
        })}
      </ScrollView>
    </View>
  );
}

export default ListPage;


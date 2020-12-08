import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const ListPage = (props) => {
  const [data, setData] = useState([]);

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
    <Stack.Navigator>
      <Stack.Screen 
        name="buurtfietsenstallingen" 
        children={() => (
          <ScrollDetail data={data}/>
        )}/>
      <Stack.Screen 
        name="Detail" 
        component={DetailPage} options={{title: ''}}
      />
    </Stack.Navigator>
  );
}

const ScrollDetail = (props) =>{
  const [data, setData] = useState([]);

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
  return(
    <View>
      <ScrollView>
          {data.map((feature) => {
            return (<View key={feature.key} style={{marginTop:2}}>
              <Button title={feature.title} onPress={() => navigation.navigate('DetailPage', {data: feature})}>{feature.address}</Button>
            </View>
          )})}
        </ScrollView>
    </View>
  );
}

const DetailPage = ({route}) =>{
  const color = route.params.data
  return(
    <View>

  </View>
  );
}

export default ListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },  
});

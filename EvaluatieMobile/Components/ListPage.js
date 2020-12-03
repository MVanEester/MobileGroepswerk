import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ListPage = (props) => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    setData(props.data)
  }, [])
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
  useEffect(()=>{
    setData(props.data)
  }, [])
  return(
    <View>
      <ScrollView>
          {data.map((feature) => {
            <View key={index}>
              <Button data={feature} onPress={() => navigation.navigate('Detail', {data: feature})}></Button>
            </View>
          })}
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

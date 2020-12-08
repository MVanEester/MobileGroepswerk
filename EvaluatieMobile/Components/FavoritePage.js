import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import DetailPage from "./DetailPage";


const Stack = createStackNavigator();

const FavoritePage = (navigation, props, route) => {
  const [data, setData] = useState([]);

  const loadAsyncData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorite_data')
      setData(jsonValue != null ? JSON.parse(jsonValue) : null);
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
          <ScrollDetail data={data} />
        )} />
      <Stack.Screen
        name="Detail"
        component={DetailPage} options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}

const ScrollDetail = (props) => {
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

// const DetailPage = ({ route }) => {
//   const feature = route.params.data
//   return (
//     <View>
//       <Card style={styles.detailStyle}>
//         <Title>{feature.title}</Title>
//         <Paragraph style={styles.itemStyle}>Adres:</Paragraph>
//         <Paragraph>{feature.address}</Paragraph>
//         <Paragraph style={styles.itemStyle}>latitude:</Paragraph>
//         <Paragraph>{feature.latitude}</Paragraph>
//         <Paragraph style={styles.itemStyle}>longitude:</Paragraph>
//         <Paragraph>{feature.longitude}</Paragraph>
//       </Card>
//     </View>
//   );
// }

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
});

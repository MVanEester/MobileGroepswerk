import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';

const addFavorite = async (value) => {
    try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@favorite_data', jsonValue)
    } catch (e) {
    // saving error
    }
}

const checkFavorites = async (key) => {
    try {
    const jsonValue = await AsyncStorage.getItem('@favorite_data')
    if (jsonValue != null) {
        JSON.parse(jsonValue)
        let result = jsonValue.filter(value => Value.key == key)
        console.log(result);
        if (result != null) {
            return true;
        }
        return false;
    }
    return false;
    } catch(e) {
    // error reading value
    }
}

const DetailPage = ({ route }) => {
    const [favorite, setFavorite] = useState(false);
    const feature = route.params.data

    useEffect(() => {
        setFavorite(checkFavorites(feature.key))
    }, []);
    return (
      <View>
        <Card style={styles.detailStyle}>
          <Title>{feature.title}</Title>
          <Paragraph style={styles.itemStyle}>Adres:</Paragraph>
          <Paragraph>{feature.address}</Paragraph>
          <Paragraph style={styles.itemStyle}>latitude:</Paragraph>
          <Paragraph>{feature.latitude}</Paragraph>
          <Paragraph style={styles.itemStyle}>longitude:</Paragraph>
          <Paragraph>{feature.longitude}</Paragraph>
          {favorite ? 
          <Button title="Toevoegen aan favorieten" onPress={() => {addFavorite(feature); setFavorite(true)}}></Button>:
          <Button title="Verwijder uit favorieten" onPress={() => {removeFavorite(feature); setFavorite(false)}}></Button>}
        </Card>
      </View>
    );
}
  
export default DetailPage;

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
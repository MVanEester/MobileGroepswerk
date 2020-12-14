import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';

const DetailPage = ({ route }) => {
    const [favorite, setFavorite] = useState();
    const [load, setLoad] = useState(true);
    const feature = route.params.data;

    
  const addFavorite = async (feature) => {
    try {
      let asyncData = await AsyncStorage.getItem('@favorites')
      if (asyncData == null) {
        setFavorite(true);
        setLoad(false);
        return await AsyncStorage.setItem('@favorites', JSON.stringify([feature]));
      }
      var favorites = JSON.parse(asyncData);
      console.log("Favorite",favorites);
      console.log("addFavorite",feature);
      favorites.push(feature);
      await AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
      setFavorite(true);
      setLoad(false);
    } catch (e) {
      console.log("addfav:",e);
    }
  }

  const removeFavorite = async (feature) => {
    try {
      var asyncData = await AsyncStorage.getItem('@favorites');
      let favorites = JSON.parse(asyncData);
      let index = 0;
      for (index; index < favorites.length; index++) {
        if (favorites[index].key == feature.key) {
          break;
        }
      }
      if (index > -1) {
        favorites.splice(index, 1);
      }
      await AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
      setFavorite(false);
      setLoad(false);
    } catch (e) {
      console.log("removefav:", e);
    }
  }

  const checkFavorites = async (key) => {
    try {
    const jsonValue = await AsyncStorage.getItem('@favorites')
    console.log("check",jsonValue);
    if (jsonValue != null) {
        let favorites = JSON.parse(jsonValue)
        let result = favorites.filter(value => value.key == key)
        if (result[0] != undefined) {
          setLoad(false)
          return true
        }
        else{
          setLoad(false)
          return false
        }
    }
    setLoad(false)
    return false
    } catch(e) {
      console.log("checkfav:",e);
    }
  }

  useEffect(() => {
    checkFavorites(feature.key).then(setFavorite)
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
        {load ? <Button title="Loading"></Button>:
        (favorite ? 
        <Button title="Verwijder uit favorieten" onPress={() => {setLoad(true);removeFavorite(feature);}}></Button>:
        <Button title="Toevoegen aan favorieten" onPress={() => {setLoad(true);addFavorite(feature);}}></Button>)}
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
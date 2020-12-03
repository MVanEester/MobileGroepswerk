import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions,  } from 'react-native';

const ListPage = (props) => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    setData(props.data)
  }, [])
  return (
    <View style={styles.container}>
        <Text>listapge</Text>
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

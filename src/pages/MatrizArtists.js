import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  Text
} from 'react-native';

const {width, height} = Dimensions.get("window");

import Circle from "../components/menu/Circle";

export default function MatrizArtists({data, setAlbums}){
    return(
      <SafeAreaView style={styles.container}>
          <FlatList
          contentContainerStyle={{alignItems:'center', width:width}}
          numColumns={2}
          data = {data}
          keyExtractor={item=>item.id}
          renderItem={({item})=>
          <View>
              <Circle
                  data = {item}
                  setAlbums = {setAlbums}
              />
          </View>}
          />
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#000',
      alignItems:'flex-start',
      width:width
    },
  });
  

  
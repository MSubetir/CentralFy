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

import Tile from "../components/menu/Tile";

export default function MatrizGens({data, setAlbums}){
    return(
      <SafeAreaView style={styles.container}>
          <FlatList
          contentContainerStyle={{alignItems:'center', width:width}}
          numColumns={3}
          data = {data}
          keyExtractor={item=>item.id}
          renderItem={({item})=>
          <View>
              <Tile
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
  

  
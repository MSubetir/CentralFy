import React,{useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  Text
} from 'react-native';


import { CommonActions  } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import useFecth from "../services/Fetch";
import Showcases from "../components/menu/Showcases";

var Holidays = require('date-holidays')
var hd = new Holidays('BR')

export default function Home({navigation, token}){
  const newRelease = useFecth.useFecth('https://api.spotify.com/v1/browse/new-releases?limit=8', token)
  const featured  = useFecth.useFecth('https://api.spotify.com/v1/browse/featured-playlists?limit=8', token)
  const categorys  = useFecth.useFecth('https://api.spotify.com/v1/browse/categories?locale=sv_US', token)

  
  const weekDays = [7,2,14,15,5,13,17]
  const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

  const handleAlbum = (album) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Library',
        params: {album:album, albums:0},
      })
    );
  }
    
  useEffect(()=>{
    
    if(categorys?.data?.categories?.items){
      categorys?.data?.categories?.items.sort(function(a, b) {
        return a.name.localeCompare(b.name);
     });
    }
    

  }, [categorys.loading])

  if (!newRelease.loading && !featured.loading){
    return(
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.textTitle}>{days[new Date().getDay()]} {hd.isHoliday(new Date()) ? 'Celebração' : categorys?.data?.categories?.items[weekDays[new Date().getDay()]]?.name}</Text>
            <Showcases
              data={''}
              url = {`https://api.spotify.com/v1/browse/categories/${hd.isHoliday(new Date()) ? 'holidays' : categorys?.data?.categories?.items[weekDays[new Date().getDay()]]?.id}/playlists?limit=8`}
              onAlbum={handleAlbum}
              token={token}
            />
            <Text style={styles.textTitle}>Playlists em destaque</Text>
            <Showcases
              data={featured?.data?.playlists?.items}
              url={''}
              onAlbum={handleAlbum}
              token={token}
            />
            <Text style={styles.textTitle}>Novos Lançamentos</Text>
            <Showcases
              data={newRelease?.data?.albums?.items}
              url={''}
              onAlbum={handleAlbum}
              token={token}
            />
          </View>
        </ScrollView>    
    )
  }else{
    return(<SafeAreaView style={styles.container}></SafeAreaView>)
  }
}

  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#000',
    },
    textTitle:{
      color:'#fff',
      fontSize:20,
      backgroundColor:'#000',
      paddingTop:10
    },
  });
  

  
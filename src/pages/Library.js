import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();


import MatrizGens from './MatrizGens'
import MatrizArtist from './MatrizArtists'
import ListAlbums from './ListAlbums'
import ListMusics from './ListMusics'

import Fetch from "../services/Fetch";


export default function Library({route, navigation, token, onMusic}){
  const dataGens = Fetch.useFecth('https://api.spotify.com/v1/browse/categories', token)
  const dataArtists  = Fetch.useFecth('https://api.spotify.com/v1/artists?ids=0oSGxfWSnnOXhD2fKuz2Gy,3dBVyJ7JuOMt4GE9607Qin,2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6,0OdUWJ0sBjDrqHygGUXeCF,0TnOYISbd1XYRBk9myaseg', token)
  
  const [albums, setAlbumsCurrent] = useState(0)
  const [album, setAlbumCurrent] = useState(0)

  const setAlbums = (data) =>{
    navigation.setParams({albums:data})
  }
  const setAlbum = (data) =>{
    navigation.setParams({album:data})
  }
  

  useEffect(() => {
    setAlbumsCurrent(route.params?.albums ? route.params?.albums : 0)
    setAlbumCurrent(route.params?.album ? route.params?.album : 0)
  }, [navigation, route.params]);

  useEffect(()=>{
    if(dataGens?.data?.categories?.items){
      dataGens?.data?.categories?.items.sort(function(a, b) {
        return a.name.localeCompare(b.name);
     });
    }
  }, [dataGens.loading])

 
  function genScreen(){
      return(
        <MatrizGens
          data = {dataGens.data.categories.items}
          setAlbums = {setAlbums}
        />
      )
  }

  function artistScreen(){
       return(
        <MatrizArtist
          data = {dataArtists.data.artists}
          setAlbums = {setAlbums}
        />
       )
   }

  if (album){
    return <ListMusics
      albums = {albums}
      album = {album}
      setAlbum = {setAlbum}
      onMusic = {onMusic}
      token = {token}
    />
  }else if(albums){
    return <ListAlbums
      albums = {albums}
      setAlbum = {setAlbum}
      setAlbums = {setAlbums}
      token = {token}
    />
  }else if(!dataGens.loading && !dataArtists.loading){
    return (
      <SafeAreaView style={styles.container}>
        <Tab.Navigator
          tabBarOptions={{
            style : {backgroundColor: '#191919' },
            indicatorStyle : {backgroundColor: '#605E62' },
            activeTintColor: "#f0edf6",
            inactiveTintColor:"#605E62",
           
          }}
        >
          <Tab.Screen name="Gêneros" component={genScreen} />
          <Tab.Screen name="Artistas" component={artistScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    )
  }else{
    return(<View style={styles.container}></View>)
  }
    
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#000'
    },
  });
  

  
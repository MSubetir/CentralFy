import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';

import Player from './pages/Player'
import Home from './pages/Home'
import Library from './pages/Library'
import Search from './pages/Search'

import SplashScreen from 'react-native-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";

import useFetch from "./services/Fetch";
import Client from './Config'

Tab = createMaterialBottomTabNavigator()



export default function App(){
  
  const [playlist, setPlaylist] = useState(0)
  const [playerColor, setPlayerColor] = useState('#605E62')
  const [albumCurrent, setAlbumCurrent] = useState(0)
  const [albumsCurrent, setAlbumsCurrent] = useState(0)
  const [playerIndex, setPlayerIndex] = useState(0)
  const [playerId, setPlayerId] = useState('1')

  const token = useFetch.Token(Client.ClientId, Client.ClientSecret)
 
  useEffect(()=>{
    Alert.alert(
      "Lembrete",
      "Este APP utiliza músicas do Spotify, o qual oferece apenas amostras de 30 segundos."
    
    );
  }, [])

  const handleMusic = (navigation, data, index) => {
   
    setPlaylist(data)
    setPlayerColor('#fff')
    setPlayerIndex(index)
    //setPlayerId(id)
    navigation.navigate('Player');
  }


  function HomeScreen({navigation}){ 
    return(
      <Home
        navigation= {navigation}
        token = {token.data.access_token}
        
      
      />
    )
  }

  function SearchScreen({navigation}){ 
    return(
      <Search
        navigation= {navigation}
        token = {token.data.access_token}
        onMusic = {(data, index) => handleMusic(navigation, data, index)}
      />
    )
  }


  function PlayerScreen({route, navigation}){
      return(
        <Player
          route={route}
          navigation = {navigation}
          songs = {playlist}
          index = {playerIndex}
        />
      )

   
  }

  function LibraryScreen({route, navigation}){ 
    //console.log(route.params, 'parametro')
    return(
      <Library
        route={route}
        navigation = {navigation}
        token = {token.data.access_token}
        
        

        onMusic = {(data, index) => handleMusic(navigation, data, index)}
      />
    )
  }

  if(!token.loading){
    SplashScreen.hide();
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Home'
          activeColor="#f0edf6"
          inactiveColor="#605E62"
          barStyle={{ backgroundColor: '#191919' }}
        >
          <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
              title:'Home',
              tabBarLabel: 'Home',
              tabBarIcon: () => (
                <MaterialCommunityIcons name="home" color={'#fff'} size={26} />
              ),
            }}
          />

        <Tab.Screen
            name='Search'
            component={SearchScreen}
            options={{
              title:'Search',
              tabBarLabel: 'Search',
              tabBarIcon: () => (
                <MaterialCommunityIcons name="search" color={'#fff'} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name='Player'
            component={PlayerScreen}
            listeners={{
              tabPress: e => {
                if (!playlist) {
                  e.preventDefault();
                }
              },
            }}
            options={{
              title:'Player',
              tabBarLabel: 'player',
              
              tabBarIcon: () => (
                <MaterialCommunityIcons name="play-circle-filled" color={playerColor} size={26} />
              ),
              labeled :false,
            }}
          />
          <Tab.Screen
            name='Library'
            component={LibraryScreen}
            options={{
              title:'Library',
              tabBarLabel: 'Library',
              
              tabBarIcon: () => (
                <MaterialCommunityIcons name="library-music" color={'#fff'} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
          }else{
            return(<View></View>)
          }
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
});



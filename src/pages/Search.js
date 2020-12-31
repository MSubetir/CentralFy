import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const { width, height } = Dimensions.get("window");
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import SearchList from "../components/menu/SearchList";

import { CommonActions } from '@react-navigation/native';
const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      inlineImageLeft='search'
      maxLength={40}
      placeholder=' Buscar'

    />
  );
}

export default function Search({ navigation, token, onMusic }) {
  const [value, onChangeText] = useState('');
  const [albumsHref, setAlbumsHref] = useState(`https://api.spotify.com/v1/search?q=album%3A&type=album`)
  const [artistHref, setArtistHref] = useState(`https://api.spotify.com/v1/search?q=artist%3A&type=artist`)
  const [musicHref, setMusicHref] = useState(`https://api.spotify.com/v1/search?q=track%3A&type=track`)


  function listScreen({ route }) {
    let type = route.params?.type
    let search = type == 'music' ? musicHref : type == 'album' ? albumsHref : artistHref
    return (
      <SearchList
        search={search}
        token={token}
        onMusic={onMusic}
        onAlbum={handleAlbum}
        onArtist={handleArtist}
        val={value}
        type={type}
      />
    )
  }

  const handleAlbum = (album) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Library',
        params: { album: album, albums: 0 },
      })
    );
  }

  const handleArtist = (artist) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Library',
        params: { album: 0, albums: artist },
      })
    );
  }

  useEffect(() => {
    setMusicHref(`https://api.spotify.com/v1/search?q=track%3A${value}&type=track`)
    setAlbumsHref(`https://api.spotify.com/v1/search?q=album%3A${value}&type=album`)
    setArtistHref(`https://api.spotify.com/v1/search?q=artist%3A${value}&type=artist`)

  }, [value])



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => onChangeText('')}
        >
          <MaterialIcons name="clear" color='#fff' style={{width:50}} size={45} />
        </TouchableOpacity>

        <UselessTextInput
          style={styles.textInput}
          numberOfLines={1}
          onChangeText={text => onChangeText(text)}
          value={value}
        />


      </View>
      <Tab.Navigator
        tabBarOptions={{
          style: { backgroundColor: '#191919', width },
          indicatorStyle: { backgroundColor: '#605E62' },
          activeTintColor: "#f0edf6",
        }}

      >
        <Tab.Screen name="Músicas" component={listScreen} initialParams={{ type: 'music' }} />
        <Tab.Screen name="Albums" component={listScreen} initialParams={{ type: 'album' }} />
        <Tab.Screen name="Artistas" component={listScreen} initialParams={{ type: 'artist' }} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  top: {
    height: height * 0.08,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width,
    flexDirection: 'row',

  },
  textInput: {
    backgroundColor: '#f0edf6',
    height: '90%',
    width: '75%',
    borderRadius: 10,
    fontSize: 16,
    color: '#191919',
    paddingLeft: 10,
    marginLeft: 25
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 5
  },

});



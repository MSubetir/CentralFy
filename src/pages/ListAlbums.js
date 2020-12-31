import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  Text
} from 'react-native';

import Topbar from '../components/menu/Topbar'
import Album from "../components/menu/Album";

import useFecth from "../services/Fetch";


export default function ListAlbums({ albums, setAlbum, setAlbums, token }) {
  const data = useFecth.useFecth(albums[0], token)
  const [endData, setEndData] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [value, onChangeText] = useState('');

  const search = (searchText) => {
    onChangeText(searchText)
    let filteredData = endData.items.filter(function (item) {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredData(filteredData)
  };

  useEffect(() => {
    if (!data.loading) {
      if (albums[1] == 'gen') {
        setEndData(data.data.playlists)
      } else if (albums[1] == 'artist') {
        setEndData(data.data)
      }
    }
  }, [data.loading])

  const renderList = () => {
    if (endData?.items?.length > 0) {
      return <FlatList
        data={filteredData && filteredData.length > 0 ? filteredData : value.length > 0 ? [] : endData.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View>
            <Album
              data={item}
              setAlbum={setAlbum}
              albums={albums}
            />
          </View>}
      />
    } else {
      return <View style={{ marginTop: 50, flex: 1, alignItems: 'center' }}>
        <Text style={styles.textTitle}>Nenhum albúm disponível</Text>
      </View>
    }
  }


  if (!data.loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Topbar
          value={value}
          search={search}
          set={setAlbums}
        />
        {renderList()}
      </SafeAreaView>
    )

  } else {
    return (<View style={styles.container}></View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 5
  },
  textTitle: {
    color: '#fff',
    fontSize: 20,
    width: '65%',
  },
});



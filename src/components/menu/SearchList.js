import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  Text
} from 'react-native';

import Music from "./Music";
import Item from "./Album";
import Artist from "./Artist";

import useFecth from "../../services/Fetch";


export default function SearchList({ search, token, onMusic, onAlbum, onArtist, val, type }) {
  const data = useFecth.useFecth(search, token)

  const [endData, setEndData] = useState([]);

  useEffect(() => {
    if (!data.loading) {
      //console.log(search)
      if (data.data.tracks?.items) {
        setEndData(data.data.tracks.items)
      } else if (data.data.albums?.items) {
        setEndData(data.data.albums.items)
      } else if (data.data.artists?.items) {
        setEndData(data.data.artists.items)
      }
    }
  }, [data.loading])


  useEffect(() => {
    if (!data.loading && val.length > 0 && type == 'music') {
     // console.log('filtro')
      let filteredData = []

      filteredData = data.data.tracks.items.filter(function (item) {
        try {
          if (item.preview_url) return item
        } catch {
          console.log('ERROR')
        }
      });

      //console.log(filteredData, 'bah')
      filteredData = filteredData.map(function (item) {
        try {
          item.url = item.preview_url;
          item.title = item.name;
          item.artist = item.artists[0].name;
          item.artwork = item.album.images[0].url ? item.album.images[0].url : 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg';
          return item
        } catch {
          console.log('ERROR')
        }
      });

      setEndData(filteredData)
    }
  }, [data.loading])

  const renderItem = (item) => {
    if (type == 'music') return <Music
      data={endData}
      song={item}
      index={endData.indexOf(item)}
      onMusic={onMusic}
    />
    else if (type == 'album') return <Item
      data={item}
      setAlbum={onAlbum}
      albums={[0, 'artist']}
    />
    else if (type == 'artist') return <Artist
      data={item}
      setArtist={onArtist}
      albums={[0, 'artist']}
    />
  }

  const renderList = () => {
    if (endData.length > 0 && val.length > 0) {
      //console.log(endData[0].album.images[0].url, 'url')
      return <FlatList
        data={endData}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View>
            {renderItem(item)}
          </View>}
      />
    } else {
      return <View style={{ marginTop: 50, flex: 1, alignItems: 'center' }}>
        <Text style={styles.textTitle}>{val.length > 0 ? 'Sem resultados' : 'Pesquise algo'}</Text>
      </View>
    }
  }

  if (!data.loading) {
    return (
      <SafeAreaView style={styles.container}>
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



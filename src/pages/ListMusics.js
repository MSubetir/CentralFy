import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Text,
} from 'react-native';

const { width, height } = Dimensions.get("window");

import Topbar from '../components/menu/Topbar'
import Music from "../components/menu/Music";

import useFecth from "../services/Fetch";


export default function ListMusics({ albums, album, setAlbum, onMusic, token }) {
  const data = useFecth.useFecth(`${album[0]}`, token)

  const [endData, setEndData] = useState([]);
  const [filteredData, setFilteredData] = useState(0);
  const [value, onChangeText] = useState('');


  const search = (searchText) => {
    onChangeText(searchText)
    let filteredData = endData.filter(function (item) {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredData(filteredData)
  };

  useEffect(() => {
    setEndData(0)
  }, [data.data])

  useEffect(() => {
    if (data.data) {
      let type = albums[1]

      if (!albums) {
        type = 'artist'
      }

      let filteredData = []

      filteredData = data.data.items.filter(function (item) {
        try {
          if (item.track.preview_url) return item
        } catch {
          try {
            if (item.preview_url) return item
          } catch {
            console.log('ERROR')
          }
        }
      });

      try {
        filteredData = filteredData.map(function (item) {
          //console.log(item)
          if (item.track) {
            item.track.artwork = item.track.album.images[0].url;
            item = item.track;
          }else{
            item.artwork = album[1].images[0].url;
          }
          item.url = item.preview_url; 
          item.title = item.name;
          item.artist = item.artists[0].name;

          return item
        });
      } catch {
        console.log('ERROR')
      }
      setEndData(filteredData)
    }
  }, [data.data])

  const renderList = () => {
    if (endData.length > 0) {
      return <FlatList
        data={filteredData && filteredData.length > 0 ? filteredData : value.length > 0 ? [] : endData}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View>
            <Music
              data={endData}
              song={item}
              index={endData.indexOf(item)}
              onMusic={onMusic}
            />
          </View>}
      />
    
    } else {
      return <View style={{ marginTop: 50, flex: 1, alignItems: 'center' }}>
        <Text style={styles.textTitle}>Nenhuma amostra disponível</Text>
      </View>
    }
  }
    


  if (!data.loading && endData) {
    return (
      <SafeAreaView style={styles.container}>
        <Topbar
          value={value}
          search={search}
          set={setAlbum}
        />

        <View style={styles.album}>
          <Image
            style={styles.iconImage}
            source={{ uri: album[1].images[0].url }}
          />
          <View style={styles.viewText}>
            <Text style={styles.textTitle}>{album[1].name}</Text>
            <Text style={styles.textArtist}>{album[1].description}</Text>
          </View>
        </View>

        {renderList()}

      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 5
  },
  album: {
    margin: 25,
    flexDirection: 'row',
    width: width * 0.95,
  },
  iconImage: {
    width: (width * 0.35),
    height: (width * 0.35),
    resizeMode: 'stretch',
    marginRight: 10,
    borderRadius: 10
  },
  textTitle: {
    color: '#fff',
    fontSize: 20,
    width: '65%',
  },
  textArtist: {
    color: '#fff',
    fontSize: 16,
    width: '65%',

  },
  viewText: {
    width: (width * 0.55),
   
  },
});



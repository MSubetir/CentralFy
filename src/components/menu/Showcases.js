import React, { useEffect, useState } from 'react'
import { Image, View, Text, StyleSheet, Dimensions, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get("window");

import useFecth from "../../services/Fetch";

export default function Showcases({ data, url, onAlbum, token}) {
  const dataUrl  = useFecth.useFecth(url, token)


  if(!dataUrl.loading){
    return (
      <View style={{ backgroundColor: '#000', }}>
        <FlatList
          contentContainerStyle={{ height: height * 0.4 }}
          horizontal
          data={data ? data : dataUrl?.data?.playlists?.items}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>

            <TouchableOpacity
              onPress={() => onAlbum([(item?.tracks?.href ? item.tracks.href : `https://api.spotify.com/v1/albums/${item.id}/tracks`), item])}

            >
              <View style={styles.item}>
                <View style={styles.viewIconImage}>
                  <Image
                    style={styles.iconImage}
                    source={{ uri: item.images[0].url }}
                  />
                </View>

                <View style={styles.viewText}>
                  <Text style={styles.textTitle}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    )
  }else{return<View style={{height: height * 0.4 }}></View>}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  textTitle: {
    color: '#fff',
    fontSize: 18
  },
  item: {
    margin: 5,
    flex: 1,
    width: width * 0.45,
    height: width * 0.60,
    backgroundColor: "#191919",
    alignItems: 'center'
  },
  viewText: {
    width: '95%',
    height: '27%',
    marginTop: '3%'

  },
  viewIconImage: {
    width: '100%',
    height: '70%',
    backgroundColor: "#000",
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',

  }
});



import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions

} from 'react-native';

import TimeLine from '../components/player/TimeLine'
import Controller from '../components/player/Controller'

import TrackPlayer,
{ CAPABILITY_PAUSE, 
  CAPABILITY_SKIP_TO_NEXT, 
  CAPABILITY_SKIP_TO_PREVIOUS, 
  CAPABILITY_PLAY, 
  CAPABILITY_SKIP, 
  CAPABILITY_JUMP_FORWARD} from 'react-native-track-player'

const playerBackground = [
  'https://i.pinimg.com/originals/c8/58/e7/c858e7597f4caf9a8afed14b303dd54e.jpg',
  'https://i.pinimg.com/originals/ca/a4/19/caa419373f80235f6679e9c6d107d514.jpg',
  'https://i.pinimg.com/originals/fb/0d/cd/fb0dcd56966bf6789221bb529104bfaf.jpg'
]

const { width, height } = Dimensions.get("window");

function Player({ route, navigation, songs, index }) {
  const [imgIndex, setImgIndex] = useState(0)
  const [playerIndex, setPlayerIndex] = useState(index)
  const [playerReady, setPlayerReady] = useState(0)

  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)

  useEffect(() => {
    setRepeat(route.params?.repeat ? route.params?.repeat : false)
    setShuffle(route.params?.shuffle ? route.params?.shuffle : false)
  }, [navigation, route.params]);

  useEffect(() => {
    if (!playerReady) {
      TrackPlayer.setupPlayer().then(() => {

        TrackPlayer.add(songs)
        setPlayerReady(true)
        setImgIndex(Math.floor(Math.random() * 3))
        TrackPlayer.play()
        TrackPlayer.skip(songs[playerIndex].id)

        
      }); 

      TrackPlayer.updateOptions({
        stopWithApp: true,

        capabilities: [
          CAPABILITY_PAUSE,
          CAPABILITY_PLAY
        ]
      })
    }


  }, []);

  useEffect(() => {
    if (playerReady) {
      TrackPlayer.skip(songs[playerIndex].id)
    }
  }, [playerIndex]);

  const handleSkipIndex = () => {

    if (playerIndex + 1 >= songs.length && !shuffle ||  songs.length <= 1) {
      TrackPlayer.stop()
      setPlayerReady(false)
    }else {
      if (!playerReady) {
        setPlayerReady(true)
        TrackPlayer.play()
      }

      if(shuffle){
        let random = 0
        do {
          random = Math.floor(Math.random() * songs.length);
        } while (random == playerIndex);
        setPlayerIndex(random)
      }else{
        setPlayerIndex(playerIndex + 1)
      }
    }
  }
  const handlePreviousIndex = () => {
    if (playerIndex - 1 < 0 && !shuffle || songs.length <= 1) {
      TrackPlayer.stop()
      setPlayerReady(false)
    } else {
      if (!playerReady) {
        setPlayerReady(true)
        TrackPlayer.play()
      }

      if(shuffle){
        let random = 0
        do {
          random = Math.floor(Math.random() * songs.length);
        } while (random == playerIndex);
        setPlayerIndex(random)
      }else{
        setPlayerIndex(playerIndex - 1)
      }
    }
  }


  return (
    <SafeAreaView style={styles.player}>
      <ImageBackground
        source={{ uri: playerBackground[imgIndex] }}
        style={styles.playerBackground}
      >
        <View style={styles.viewText}>
          <Text style={styles.textTitle}>{songs[playerIndex].name}</Text>
          <Text style={styles.textArtist}>{songs[playerIndex]?.artists[0]?.name}</Text>
        </View>
        
        <Image
          style={styles.playerImage}
          source={{ uri: songs[playerIndex].artwork }}
        />

        <TimeLine
          repeat = {repeat}
          onSkip={handleSkipIndex}
        />
        <Controller
          shuffle= {shuffle}
          repeat = {repeat}
          navigation = {navigation}
          onPrev={handlePreviousIndex}
          onSkip={handleSkipIndex}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Player

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewText:{
    width: (width * 0.9),
    height: (height * 0.14),
    overflow: 'hidden',
    justifyContent:'center'
  },
  textTitle: {
    color: '#fff',
    fontSize: 20,
    textAlign: "center"
  },
  textArtist: {
    color: '#fff',
    fontSize: 16,
    textAlign: "center"
  },
  player: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerImage: {
    width: (width * 0.80),
    height: (width * 0.80),
    resizeMode: 'stretch',
    margin: 10
  },
  playerBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    resizeMode: 'cover',
    width: '100%',
  }
});

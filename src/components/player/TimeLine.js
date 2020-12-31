import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import TrackPlayer from 'react-native-track-player'
import Slider from '@react-native-community/slider'
import { color } from 'react-native-reanimated';

const { width, height} = Dimensions.get("window");

export default function TimeLine({repeat, onSkip}) {

  const {position, duration} = TrackPlayer.useTrackPlayerProgress();
  const handleChange = (value) =>{
    TrackPlayer.seekTo(value)
  } 

  useEffect(()=>{
    if (position > 1 && parseInt(position) >= parseInt(duration) - 1){
      repeat? TrackPlayer.seekTo(0) : onSkip()
    }
    //console.log(parseInt(position), parseInt(duration))
  }, [position])

  return(
    <View style={styles.container}>
      <Slider
        style={{width: (width*0.85), height: 30}}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#f0edf6"
        maximumTrackTintColor="#f0edf6"
        thumbTintColor='#fff'
        onSlidingComplete={handleChange}
        
      />
      <View style={styles.textContainer}>
        <Text style={styles.timer}>{new Date(1000 * position).toISOString().substr(14, 5)}</Text>
        <Text style={styles.timer}>{new Date(1000 * duration).toISOString().substr(14, 5)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      width:'80%',
      alignItems:'center',
      justifyContent:'center',
    },
    textContainer:{
      width:'100%',
      alignItems:'flex-end',
      justifyContent:'space-between',
      flexDirection:'row',
      
    },
    timer:{
        color:'#fff'
    }
});

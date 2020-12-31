import React, {useState, useEffect} from 'react'
import {ActivityIndicator, View, Text, TouchableOpacity, StyleSheet} from 'react-native'

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import TrackPlayer, {STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING, STATE_NONE} from 'react-native-track-player'
import {usePlaybackState} from 'react-native-track-player/lib/hooks';

export default function Controller({shuffle, repeat, navigation, onPrev, onSkip}) {
    const playbackState = usePlaybackState()
    
    const [isPlaying, setIsPlaying] = useState(STATE_PAUSED)

    useEffect(() => {
    if (playbackState == STATE_PLAYING){
        setIsPlaying(STATE_PAUSED) 
    } else if(playbackState == STATE_PAUSED){
        setIsPlaying(STATE_PLAYING)
    } else if(playbackState == STATE_NONE){
        setIsPlaying(STATE_NONE)
    } else{
        setIsPlaying(STATE_BUFFERING)
    }
    //console.log(isPlaying, playbackState)
    }, [playbackState])
    
    const handleButton = () =>{
        if (playbackState == STATE_PLAYING){
            TrackPlayer.pause()
        } else if(playbackState == STATE_PAUSED || playbackState == STATE_NONE){
            TrackPlayer.play()
        } 
    }

    const renderButton = () =>{
        if (isPlaying == STATE_PLAYING){
          return <MaterialIcons name="play-arrow" color='#fff' size={60} />
        } else if(isPlaying == STATE_PAUSED){      
          return <MaterialIcons name="pause" color='#fff' size={60} />
        }else if(isPlaying == STATE_NONE){      
            return <MaterialIcons name="replay" color='#fff' size={60} />
          }else{
          return <ActivityIndicator size={60} color="#fff" />
        }
        
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.setParams({shuffle:!shuffle})}>
                <MaterialIcons style={{marginRight:10}} name="shuffle" color={shuffle ? '#fff' : '#605E62'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPrev}>
                <MaterialIcons name="skip-previous" color='#fff' size={45} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleButton}>
                {renderButton()}
            </TouchableOpacity>
            <TouchableOpacity onPress={onSkip}>
                <MaterialIcons name="skip-next" color='#fff' size={45} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.setParams({repeat:!repeat})}>
                <MaterialIcons style={{marginLeft:10}} name="repeat" color={repeat ? '#fff' : '#605E62'} size={30} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        
    },
});

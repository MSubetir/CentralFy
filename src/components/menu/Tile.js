import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native'

const {width, height} = Dimensions.get("window");

export default function Tile({data, setAlbums}){
    //console.log(data)
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => setAlbums([`https://api.spotify.com/v1/browse/categories/${data.id}/playlists`, 'gen'])}
            >
                <View style={styles.item}>
                  
                   
                        <Text style={styles.textTitle}>{data.name}</Text>
                    
                </View>
            </TouchableOpacity>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    item:{
        alignItems:'center',
        justifyContent:'center',
        margin:5,
        flex:1,
        width:width*0.30,
        height:width*0.30,
        backgroundColor:"#191919",   
    },
    textTitle:{
        color:'#fff',
        fontSize:20,
        textAlign:'center'
    },
})
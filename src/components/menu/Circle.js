import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native'

const {width, height} = Dimensions.get("window");

export default function Circle({data, setAlbums}){
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => setAlbums([`https://api.spotify.com/v1/artists/${data.id}/albums`, 'artist'])}
            >
                <View style={styles.item}>
                    <View style={styles.viewImageArtist}>
                        <Image
                            style={styles.imageArtist}
                            source={{uri:data.images[0].url}}
                        />
                    </View>
                    
                    <View style={styles.viewText}>
                    <Text style={styles.textTitle}>{data.name}</Text>
                    </View>
                    

                    
                </View>
            </TouchableOpacity>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    imageArtist:{
        width:'100%',
        height:'100%',
        borderRadius:100,
    },
    viewImageArtist:{
        width:'90%',
        height:'70%',
        marginVertical:3
    },
    viewText:{
        width:'80%',
        height:'30%',
      
    },
    item:{
        alignItems:'center',
        justifyContent:'flex-start',
        margin:5,
        flex:1,
        width:width*0.40,
        height:width*0.50,
        backgroundColor:"#191919",
        borderRadius:25
        
    },
    textTitle:{
        color:'#fff',
        fontSize:20,
        textAlign:'center',
    },
})
import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

const Item = ({ data, setAlbum, albums }) => {
    const [tracksHref, setTracksHref] = useState('')

    useEffect(() => {
        if (albums[1] == 'gen') {
            setTracksHref(data.tracks.href)
        } else if (albums[1] == 'artist') {
            setTracksHref(`https://api.spotify.com/v1/albums/${data.id}/tracks`)
        }
    }, [])
    
    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={() => setAlbum([tracksHref, data])}
            >
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Image
                            style={styles.iconImage}
                            source={{ uri: data?.images[0]?.url ? data?.images[0]?.url : 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg'}}
                        />
                        <View>
                            <Text style={styles.textTitle}>{data.name}</Text>
                        </View>
                    </View>

                    <View style={styles.icon}>
                        <MaterialIcons name="keyboard-arrow-right" color='#fff' size={45} />
                    </View>


                </View>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

export default Item

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        margin: 10,

    },
    icon: {
        width: width * 0.20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.5,

    },
    textTitle: {
        color: '#fff',
        fontSize: 18
    },
    iconImage: {
        width: (width * 0.17),
        height: (width * 0.17),
        resizeMode: 'stretch',
        marginRight: 10,
        borderRadius: 10
    }
})
